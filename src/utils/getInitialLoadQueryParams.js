const getInitialLoadQueryParams = (filterNames) => {
    let queryParam;

    filterNames.forEach(key => {
        const filterStoredValue = JSON.parse(localStorage.getItem(key));

        if (filterStoredValue) {
            queryParam = {
                [key]: filterStoredValue
            }
        }
    })

    return queryParam;
}

export default getInitialLoadQueryParams;