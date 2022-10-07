export const GET_CATEGORY_NAMES = `
    query {
        categories {
            name
        }
    }
`;

export const GET_CURRENCIES = `
    query {
        currencies {
            label,
            symbol
        }
    }
`;

export const GET_CATEGORY_NAMES_AND_CURRENCIES = `
    query {
        categories {
            name
        },
        currencies {
            label,
            symbol
        }
    }
`
export const GET_CUR_CATEGORY_NAME_PRODUCTS = `
    query($input: CategoryInput) {
        category(input: $input) {
            products {
                gallery,
                name,
                id,
                inStock,
                prices {
                    currency {
                        symbol
                    },
                    amount
                }
            }
        }
    }
`;