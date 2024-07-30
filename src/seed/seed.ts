import { SeedCountry, countries } from './seed-countries';

type validCategories = "macetas" | "floreros" | "lamparas" | "otros"



interface SeedProduct {
    title: string;
    description: string;
    slug: string;
    images: string[];
    enabled: boolean;
    unique: boolean;
    useStock: boolean;
    inStock: SeedInStock[];
    // sizes: ValidSizes[];
    tags: string[];
    category: validCategories;
}

interface SeedUser {
    name: string;
    email: string;
    role: 'user' | 'admin';
    image: string;
}

const validSizes = ['small', 'medium', 'large', 'extralarge', 'unique'] as const;
type ValidSizes = typeof validSizes[number];

interface SeedColors {
    name: string;
    quantity: number
}
interface SeedInStock {
    size: ValidSizes;
    price: number;
    oldPrice?: number;
    colors: SeedColors[];
}

interface SeedData {
    users: SeedUser[];
    categories: string[];
    products: SeedProduct[];
    countries: SeedCountry[];
    discountCode: SeedDiscountCode[]
}

interface SeedDiscountCode {
    code: string;
    description?: string;
    discount: number;
    isActive?: boolean;
    usageLimit?: number
}

export const initialData: SeedData = {
    users: [
        {
            email: 'hernanarevalo16@gmail.com',
            name: 'Hernán Arévalo SEED',
            role: 'admin',
            image: 'https://lh3.googleusercontent.com/a/ACg8ocJB9AVV5Os3ukiYGdAOK3H1iY-mkQ1kxF79DLfzcDaFJql1BJ0=s96-c'
        }
    ],
    categories: [
        'macetas',
        'floreros',
        'lámparas',
        'otros',
        'sale'
    ],
    discountCode: [
        {
            code: "INVIERNO",
            discount: 10,
            isActive: true,
        },
        {
            code: "HOTWEEK25",
            discount: 25,
            isActive: true,
            usageLimit: 10
        }
    ],
    countries: countries,
    products: [
        {
            description: "Maceta Pouder",
            images: [
                'https://res.cloudinary.com/dabmixcta/image/upload/v1721690228/vxufarcg9itxxqisqyfe.jpg',
                'https://res.cloudinary.com/dabmixcta/image/upload/v1721690228/jgdn3devoktbe2iwh8k1.jpg',
            ],
            enabled: true,
            unique: false,
            category: "macetas",
            useStock: true,
            inStock: [
                {
                    size: 'medium',
                    price: 9000,
                    oldPrice: 10000,
                    colors: [
                        { name: 'naranja', quantity: 10 },
                        { name: 'rosa', quantity: 5 }
                    ]
                },
                {
                    size: 'large',
                    price: 9500,
                    oldPrice: 10500,
                    colors: [
                        { name: 'rosa', quantity: 3 }
                    ]
                }
            ],
            slug: "maceta_pouder",
            tags: ['maceta'],
            title: "Maceta Pouder",
        },
    ]
    
};
