const get = async (req, res, next) => {
  if (isNaN(req.params.id)) {
    throw new Error('ID is not a number');
  }

  res.send({ message: 'ID is a number' });
};

export default {
  get
};
