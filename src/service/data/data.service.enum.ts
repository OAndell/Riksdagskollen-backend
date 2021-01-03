export enum DataSourceURL {
    POLLING_DATA_API = 'https://sv.wikipedia.org/w/api.php?action=parse&format=json&origin=*&page=Opinionsunders%C3%B6kningar_inf%C3%B6r_riksdagsvalet_i_Sverige_2022',
    POLLING_DATA_URL = 'https://sv.wikipedia.org/wiki/Opinionsundersökningar_inför_riksdagsvalet_i_Sverige_2022',
}

export enum PartyAbbreviation {
    S = 'S',
    M = 'M',
    SD = 'SD',
    C = 'C',
    V = 'V',
    KD = 'KD',
    L = 'L',
    MP = 'MP',
}

export enum DataFetchOption {
    FETCH_ALL = 'fetchAll',
    SUMMARY = 'summary',
}
