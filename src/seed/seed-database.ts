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

    await prisma.productImage.deleteMany();
    await prisma.inStock.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();

    const { categories, products, users, countries } = initialData;

    // users
    await prisma.user.createMany({
        data: users
    });

    // countries
    await prisma.country.createMany({
        data: countries
    });

    // categories
    const categoriesData = categories.map((name) => (
        { name: name.charAt(0).toUpperCase() + name.slice(1) }
    ));

    await prisma.category.createMany({
        data: categoriesData
    });

    const categoriesDB = await prisma.category.findMany();
    
    const categoriesMap = categoriesDB.reduce((map, category) =>{
        map[category.name.toLowerCase()] = category.id;
        return map;
    }, {} as Record<string, string>);

    // products
    for (const product of products) {
        const { images, category, inStock, ...rest } = product;

        const dbProduct = await prisma.product.create({
            data: {
                ...rest,
                categoryId: categoriesMap[category.toLowerCase()]
            }
        });

        // images 
        const imagesData = images.map(image => ({
            url: image,
            productId: dbProduct.id
        }));

        await prisma.productImage.createMany({
            data: imagesData
        });

        // inStock
        for (const stock of inStock) {
            const { colors, ...restStock } = stock;
            const dbInStock = await prisma.inStock.create({
                data: {
                    ...restStock,
                    productId: dbProduct.id
                }
            });

            // colors
            const colorsData = Object.keys(colors).map(color => ({
                name: color,
                stock: colors[color],
                inStockId: dbInStock.id
            }));

            await prisma.color.createMany({
                data: colorsData
            });
        }
    }

    console.log('Seed executed properly');
}

(() => {
    if (process.env.NODE_ENV === 'production') return;

    main();
})();
