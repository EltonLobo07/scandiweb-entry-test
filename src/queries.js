export const GET_CURRENCIES_AND_CATEGORIES = `
    query {
        categories {
            name
        },
        currencies {
            label,
            symbol
        }
    }
`;
