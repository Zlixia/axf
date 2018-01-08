var Mock = require('mockjs')
var fs = require('fs')

var data = new Mock.mock({
    //轮播图数据
    'bannar|3-5':[
        {
        'id|+1': 1,
        'bannar_img': '@image(320x140,@color)',
        'cids|4':[
            {
                'cid_id|+1': 1,
                'name': '@cname(3,5)'
            }
        ],
        'products|30-50':[
            {
                //子分类id
                'cidId|0-3':10,
                'product_id|+1': 1,
                'product_img': '@image(168x168,@color)',
                'product_name': '@cword(2,8)',
                'price|1-99.1': 10,
                'unit|10-1000': 10 
            }
        ]
        }
    ],
    //最大分类数据
    'categories|15': [
        {
            //大分类的id
            'id|+1': 1,
            //分类的名称
            'name': '@cname(2,5)',
            //分类的图片
            'category_img': '@image(320x76,@color)',
            //分类标题的颜色
            'color': '@color',
            //子分类
            'cids|4': [
                {
                    //子分类的名称
                    'name': '@cname(2,8)',
                }
            ],
            //保存分类所对应的商品数据
            'products': []
        }
    ],
    //所有的商品
    'products|150-300': [
        {
            //商品的id
            'id|+1': 1,
            //商品对应的分类id
            'categoryId|1-15': 10,
            //该商品对应的子分类的id
            'cidsId|0-3': 10,
            //商品的名称
            'name': '@cname(2,5)',
            //商品的图片
            'imgs': {
                //列表页使用的缩略图
                'min': '@image(80x80,@color,@cword)',
                //详情页使用的大图
                'big': '@image(300x300,@color,@cword)'
            },
            //商品的价格
            'price|1-99.1': 10,
            //商品的规格
            'unit|10-1000': 10,
            //商品的保质期
            'expiration_date|1-3.1': 10,
            // 商品的品牌
            'brand': '@cword(2, 6)',
            //商品的产原地
            'place_of_origin': '@cword(2,4)',
            //每个商品的数量
            'num': 0,
            //商品详情
            'details': '@cparagraph()'
        }
    ],
    //用户信息表
    /* 
    {
        id,
        phone
    }
    */
    'users': [],
    // 购物车表
    /* 
    {
        商品在购物车中表的 id,
        商品的id product_id,
        用户id user_id,
        商品的数量,
        商品的图片,
        商品的名称,
        商品的价格,
        是否选择
    }
    */
    'carts': []
})

fs.writeFile('db.json', JSON.stringify(data, null, 2),function () {
    console.log('写入成功')
})