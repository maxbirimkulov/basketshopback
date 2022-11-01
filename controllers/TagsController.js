import TagsModel from '../models/Tags.js'

export const getAllTag = async (req, res) => {
    try {
        let clothes = await TagsModel.find({
            title: new RegExp(req.query.title, 'i'),
            category: new RegExp(req.query.category, 'i'),
            brand: new RegExp(req.query.brand, 'i'),
           })
        res.json(clothes)
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить все  статьи'
        })
    }
};

export const getOneTag = async (req, res) => {
    try {
        const clothesId = req.params.id;

        TagsModel.findByIdAndUpdate({
            _id: clothesId,
        },{
            $inc: {viewsCount: 1}
        },{
            returnDocument: 'after',
        }, (err, doc) => {
            if (err) {
                console.log(err);
                return  res.status(500).json({
                    message: 'Не удалось получить тег'
                })
            }
            if (!doc) {
                return res.status(404).json({
                    message: 'Тег не найден'
                })
            }

            res.json(doc)
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить теги'
        })
    }
};

export const removeTag = async (req, res) => {
    try {
        const clothesId = req.params.id;
        TagsModel.findByIdAndDelete({
            _id: clothesId
        }, (err, doc) => {
            if (err){
                console.log(err);
                return  res.status(500).json({
                    message: 'Не удалось удалить тег'
                })
            }

            if (!doc){
                return res.status(404).json({
                    message: 'Тег не найден'
                })
            }

            res.json({success: true})
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось удалить тег'
        })
    }
};

export const createTag =  async (req, res) => {
    try {
        const doc = new TagsModel({
            title: req.body.title,
            category: req.body.category,
            brand: req.body.brand
        });
        const tags = await doc.save();
        res.json(tags)
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось создать тег'
        })
    }
};

export const updateTag =  async (req, res) => {
    try {
        const clothesId = req.params.id;
        await TagsModel.updateOne({
            _id: clothesId
        }, {
            title: req.body.title,
            category: req.body.category,
            brand: req.body.brand,
        });
        res.json({success: true})
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось обновить тег'
        })
    }
};

