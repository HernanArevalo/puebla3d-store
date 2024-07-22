import { SeedCountry, countries } from './seed-countries';

type validCategories = "macetas" | "floreros" | "lamparas" | "otros"

interface SeedProduct {
    title: string;
    description: string;
    slug: string;
    images: string[];
    enabled: boolean;
    useStock: boolean;
    inStock: SeedInStock[];
    sizes: ValidSizes[];
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

interface SeedInStock {
    size: ValidSizes;
    price: number;
    oldPrice?: number;
    colors: Record<string, number>;
}

interface SeedData {
    users: SeedUser[];
    categories: string[];
    products: SeedProduct[];
    countries: SeedCountry[];
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
    countries: countries,
    products: [
        {
            description: "Maceta Pouder",
            images: [
                'https://i.imgur.com/bqMlfHW.jpeg',
                'https://i.imgur.com/50RbtP1.png',
            ],
            enabled: true,
            category: "macetas",
            useStock: true,
            inStock: [
                {
                    size: 'medium',
                    price: 9000,
                    oldPrice: 10000,
                    colors: {
                        naranja: 8,
                        rosa: 5
                    }
                },
                {
                    size: 'large',
                    price: 9500,
                    oldPrice: 10500,
                    colors: {
                        naranja: 2,
                        rosa: 7
                    }
                }
            ],
            sizes: ['medium', 'large', 'extralarge'],
            slug: "maceta_pouder",
            tags: ['maceta'],
            title: "Maceta Pouder",
        },
    ]
};
