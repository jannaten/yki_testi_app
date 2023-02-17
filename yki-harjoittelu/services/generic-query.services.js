class GenericService {
  constructor(model) {
    this.model = model;
  }

  getAll = async () => await this.model.find();

  getById = async (id) => await this.model.findById({ _id: id });

  getManyByIds = async (ids) =>
    await this.model.find({
      _id: { $in: ids }
    });

  add = async (body) => await new this.model(body).save();

  update = async (id, body) =>
    await this.model.findByIdAndUpdate(id, body, {
      new: true
    });

  delete = async (id) =>
    await this.model.findByIdAndDelete(id, {
      new: true
    });
}

export default GenericService;
