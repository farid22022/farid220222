import Theme from "../models/Theme.js";
import UserThemePreference from "../models/UserThemePreference.js";
import { linkImageMetadata } from "../utils/imageMetadata.js";
import { normalizeImageUrl } from "../utils/imageValidation.js";

const themeKeys = ["siteName", "logo", "favicon"];

function pick(source, keys) {
  return keys.reduce((result, key) => {
    if (source[key] !== undefined) result[key] = source[key];
    return result;
  }, {});
}

function serialize(document) {
  if (!document) return null;
  const value = document.toObject ? document.toObject() : document;
  const { owner, __v, ...response } = value;
  return response;
}

async function findPublicTheme() {
  const savedPreference = await UserThemePreference.findOne().sort({ updatedAt: -1 });
  if (savedPreference) return savedPreference;
  return Theme.findOne();
}

export async function getThemePreference(req, res, next) {
  try {
    let preference = req.admin
      ? await UserThemePreference.findOne({ owner: req.admin._id })
      : await findPublicTheme();

    if (!preference && req.admin) {
      const legacyTheme = await Theme.findOne();
      preference = await UserThemePreference.create({
        owner: req.admin._id,
        ...(legacyTheme ? pick(legacyTheme.toObject(), themeKeys) : {})
      });
    }

    res.json(serialize(preference) || {});
  } catch (error) {
    next(error);
  }
}

export async function updateThemePreference(req, res, next) {
  try {
    const payload = pick(req.body, themeKeys);
    if (payload.logo !== undefined) payload.logo = normalizeImageUrl(payload.logo, "Logo");
    if (payload.favicon !== undefined) payload.favicon = normalizeImageUrl(payload.favicon, "Favicon");

    const preference = await UserThemePreference.findOneAndUpdate(
      { owner: req.admin._id },
      payload,
      { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
    );

    // Keep the legacy singleton in sync so existing clients and data remain compatible.
    await Theme.findOneAndUpdate({}, pick(preference.toObject(), themeKeys), {
      new: true,
      upsert: true,
      runValidators: true,
      setDefaultsOnInsert: true
    });

    await linkImageMetadata({
      owner: req.admin._id,
      entityType: "theme",
      entityId: preference._id,
      urls: [preference.logo, preference.favicon]
    });

    res.json(serialize(preference));
  } catch (error) {
    next(error);
  }
}
