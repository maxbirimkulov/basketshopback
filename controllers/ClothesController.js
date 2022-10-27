import ClothesModel from '../models/Clothes.js'

export const getAll = async (req, res) => {
    try {
        let clothesLength;
        let clothes = await ClothesModel.find()

        



        // if (req.query.category && req.query.brand) {
        //      clothesLength = await ClothesModel.find({
        //         title: new RegExp(req.query.title, 'i'),
        //         category: {
        //             $in: req.query.category.split(',')
        //         },
        //          brand: {
        //              $in: req.query.brand.split(',')
        //          },
        //         price: {
        //             $gte : req.query.from ? req.query.from : 0,
        //             $lte : req.query.to ? req.query.to : 20000
        //         }});
        //      clothes = await ClothesModel.find({
        //         title: new RegExp(req.query.title, 'i'),
        //         category: {
        //             $in: req.query.category.split(',')
        //         },
        //          brand: {
        //              $in: req.query.brand.split(',')
        //          },
        //         price: {
        //             $gte : req.query.from ? req.query.from : 0,
        //             $lte : req.query.to ? req.query.to : 20000
        //         }},
        //     ).sort(req.query.desc === 'true' ? '-price' : 'price').skip(+req.query.page === 1 ? 0 : +req.query.page * +req.query.limit - +req.query.limit).limit(+req.query.limit);
        // }  else if (req.query.category) {
        //     clothesLength = await ClothesModel.find({
        //         title: new RegExp(req.query.title, 'i'),
        //         category: {
        //             $in: req.query.category.split(',')
        //         },
        //         price: {
        //             $gte : req.query.from ? req.query.from : 0,
        //             $lte : req.query.to ? req.query.to : 20000
        //         }});
        //     clothes = await ClothesModel.find({
        //         title: new RegExp(req.query.title, 'i'),
        //         category: {
        //             $in: req.query.category.split(',')
        //         },
        //         price: {
        //             $gte : req.query.from ? req.query.from : 0,
        //             $lte : req.query.to ? req.query.to : 20000
        //         }},
        //     ).sort(req.query.desc === 'true' ? '-price' : 'price').skip(+req.query.page === 1 ? 0 : +req.query.page * +req.query.limit - +req.query.limit).limit(+req.query.limit);
        // } else if (req.query.brand) {
        //     clothesLength = await ClothesModel.find({
        //         title: new RegExp(req.query.title, 'i'),
        //         brand: {
        //             $in: req.query.brand.split(',')
        //         },
        //         price: {
        //             $gte : req.query.from ? req.query.from : 0,
        //             $lte : req.query.to ? req.query.to : 20000
        //         }});
        //     clothes = await ClothesModel.find({
        //         title: new RegExp(req.query.title, 'i'),
        //         brand: {
        //             $in: req.query.brand.split(',')
        //         },
        //         price: {
        //             $gte : req.query.from ? req.query.from : 0,
        //             $lte : req.query.to ? req.query.to : 20000
        //         }},
        //     ).sort(req.query.desc === 'true' ? '-price' : 'price').skip(+req.query.page === 1 ? 0 : +req.query.page * +req.query.limit - +req.query.limit).limit(+req.query.limit);
        // } else {
        //
        //     clothesLength = await ClothesModel.find({
        //         title: new RegExp(req.query.title, 'i'),
        //         price: {
        //             $gte : req.query.from ? req.query.from : 0,
        //             $lte : req.query.to ? req.query.to : 20000
        //         }});
        //     clothes = await ClothesModel.find({
        //         title: new RegExp(req.query.title, 'i'),
        //         price: {
        //             $gte : req.query.from ? req.query.from : 0,
        //             $lte : req.query.to ? req.query.to : 20000
        //         }},
        //     ).sort(req.query.desc === 'true' ? '-price' : 'price').skip(+req.query.page === 1 ? 0 : +req.query.page * +req.query.limit - +req.query.limit).limit(+req.query.limit);
        // }





        res.json(clothes)


        // res.json({
        //     products: clothes,
        //     productsLength : clothesLength.length
        // })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить все  статьи'
        })
    }
};

export const getOne = async (req, res) => {
    try {
        const clothesId = req.params.id;

        ClothesModel.findByIdAndUpdate({
            _id: clothesId,
        },{
            $inc: {viewsCount: 1}
        },{
            returnDocument: 'after',
        }, (err, doc) => {
            if (err) {
                console.log(err);
               return  res.status(500).json({
                    message: 'Не удалось получить статью'
                })
            }
            if (!doc) {
                return res.status(404).json({
                    message: 'Статья не найдена'
                })
            }

            res.json(doc)
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить все  статьи'
        })
    }
};

export const remove = async (req, res) => {
    try {
        const clothesId = req.params.id;
        ClothesModel.findByIdAndDelete({
            _id: clothesId
        }, (err, doc) => {
            if (err){
                console.log(err);
                return  res.status(500).json({
                    message: 'Не удалось удалить вещь'
                })
            }

            if (!doc){
                return res.status(404).json({
                    message: 'Вещь не найдена'
                })
            }

            res.json({success: true})
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось удалить'
        })
    }
};

export const create =  async (req, res) => {
    try {
        const doc = new ClothesModel({
            title: req.body.title,
            price : req.body.price,
            images: req.body.images,
            sizes: req.body.sizes,
            category: req.body.category,
            subcategory: req.body.subcategory,
            inStock: req.body.inStock,
            brand: req.body.brand,
            tag: req.body.tag,
            description: req.body.description
        });

        const clothes = await doc.save();
        console.log(clothes)
        res.json(clothes)
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось создать статью'
        })
    }
};

export const update =  async (req, res) => {
    try {
        const clothesId = req.params.id;

        await ClothesModel.updateOne({
            _id: clothesId
        }, {
            title: req.body.title,
            price : req.body.price,
            images: req.body.images,
            sizes: req.body.sizes,
            category: req.body.category,
            inStock: req.body.inStock,
            brand: req.body.brand
        });
        res.json({success: true})
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось обновить статью'
        })
    }
};

