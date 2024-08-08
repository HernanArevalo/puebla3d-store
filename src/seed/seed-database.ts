import { initialData } from "./seed";
import prisma from '../lib/prisma'


async function main() {
    
    // 1. Delete previous records
    await prisma.orderAddress.deleteMany();
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    
    await prisma.userAddress.deleteMany();
    await prisma.user.deleteMany();
    await prisma.country.deleteMany();
    await prisma.province.deleteMany();

    await prisma.discountCode.deleteMany();
    await prisma.productImage.deleteMany();
    await prisma.color.deleteMany();
    await prisma.inStock.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();

    const { categories, products, users, countries, discountCode, provinces } = initialData;

    //* discountCode
    await prisma.discountCode.createMany({
        data: discountCode
    });
    //* users
    await prisma.user.createMany({
        data: users
    });

    //* countries
    await prisma.country.createMany({
        data: countries
    });
    //* provinces
    await prisma.province.createMany({
        data: provinces
    });

     //* categories
     const categoriesData = categories.map((name) => (
        { name: name.toLowerCase()}
    ));

    await prisma.category.createMany({
        data: categoriesData
    });

    //* products
    for (const product of products) {
        const { images, inStock, ...rest } = product;

        const dbProduct = await prisma.product.create({
            data: {
                ...rest,
            }
        });

        //* images 
        const imagesData = images.map(image => ({
            url: image,
            productId: dbProduct.id
        }));

        await prisma.productImage.createMany({
            data: imagesData
        });

        //* inStock
        for (const stock of inStock) {
            const { colors, ...restStock } = stock;
            const dbInStock = await prisma.inStock.create({
                data: {
                    ...restStock,
                    productId: dbProduct.id
                }
            });

            for (const color of colors){
                const dbColor = await prisma.color.createMany({
                    data: {
                        ...color,
                        inStockId: dbInStock.id
                    }
                })
            }

        }
        //* Colors
        

    }

    console.log('Seed executed properly');
}

(() => {
    if (process.env.NODE_ENV === 'production') return;

    main();
})();
