import Theme from "../models/Theme.js";

export async function getTheme(req, res, next) {
  try {
    const theme = await Theme.findOne();
    res.json(theme);
  } catch (error) {
    next(error);
  }
}

export async function updateTheme(req, res, next) {
  try {
    const theme = await Theme.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true,
      runValidators: true,
      setDefaultsOnInsert: true
    });
    res.json(theme);
  } catch (error) {
    next(error);
  }
}
