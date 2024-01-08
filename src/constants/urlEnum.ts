export enum UrlEnum {

    Server = "http://localhost:8080",
    VerApi = "/api/v1",

    // URL ДЛЯ ПОЛУЧЕНИЯ ВСЕХ АВТОТРАНСПОРТНЫХ СРЕДСТВ
    CarGetAll = '/car/get_all',
    // URL ДЛЯ ДОБАВЛЕНИЯ АВТОТРАНСПОРТНОГО СРЕДСТВА
    CarNew = '/car/new',
    // URL ДЛЯ РЕДАКТИРОВАНИЯ АВТОТРАНСПОРТНОГО СРЕДСТВА
    CarEdit = '/car/edit',

    // URL ДЛЯ ПОЛУЧЕНИЯ ВСЕХ ТИПОВ ТС
    TypeGetAll = '/type/get_all',

    // URL ДЛЯ ПОЛУЧЕНИЯ ВСЕХ КАТЕГОРИЙ ТС
    CategoryGetAll = '/category/get_all',
}