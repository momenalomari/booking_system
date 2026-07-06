import Field from "../model/Field.Model.js";

const createField = async (req, res) => {
  try {
    const { name, location, type, pricePerHour, description, image } = req.body;
    const newField = new Field({
      name,
      location,
      type,
      pricePerHour,
      description,
      image,
    });
    await newField.save();
    res.status(201).json(newField);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllFields = async (req, res) => {
  try {
    const fields = await Field.find();
    res.status(200).json(fields);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getFieldById = async (req, res) => {
  try {
    const field = await Field.findById(req.params.id);
    if (!field) {
      return res.status(404).json({ message: "Field not found" });
    }
    res.status(200).json(field);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update field by id
const updateField = async (req, res) => {
  try {
    // 1. استخدام id بدل name
    const field = await Field.findById(req.params.id);
    if (!field) {
      return res.status(404).json({ message: "Field not found" });
    }

    // 2. فحص ذكي للاسم: لا تفحص الداتابيز إلا إذا المستخدم فعلاً غيّر الاسم
    if (req.body.name && req.body.name !== field.name) {
      const isExist = await Field.findOne({ name: req.body.name, _id: { $ne: req.params.id }   });
      if (isExist) {
        return res.status(409).json({ message: "Field name already exists" });
      }
    }

    field.name = req.body.name || field.name;
    field.location = req.body.location || field.location;
    field.type = req.body.type || field.type;
    field.pricePerHour = req.body.pricePerHour || field.pricePerHour;
    field.description = req.body.description || field.description;
    field.image = req.body.image || field.image;
    
    field.isAvailable =
      req.body.isAvailable !== undefined
        ? req.body.isAvailable
        : field.isAvailable;

    const updatedField = await field.save();
    res.status(200).json(updatedField);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteField = async (req, res) => {
  try {
    // 3. استخدام الطريقة الحديثة للحذف في Mongoose
    const deletedField = await Field.findByIdAndDelete(req.params.id);
    
    if (!deletedField) {
      return res.status(404).json({ message: "Field not found" });
    }
    
    res.status(200).json({ message: "Field deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createField, getAllFields, getFieldById, updateField, deleteField };