import {Checkbox} from "antd";
import {ColumnsType} from "antd/es/table";
import {CarModel} from "../models/CarModel";

export const carColumns: ColumnsType<CarModel> = [
    {
        title: 'Марка',
        dataIndex: ['make'],
        key: 'make',
        width: '150px',
    },
    {
        title: 'Модель',
        dataIndex: ['model'],
        key: 'model',
        width: '150px',
    },
    {
        title: 'Категория',
        dataIndex: ['category', 'name'],
        key: 'category',
        width: '150px',
    },
    {
        title: 'Государственный номер',
        dataIndex: ['gosNumber'],
        key: 'gosNumber',
        width: '150px',
    },
    {
        title: 'Тип ТС',
        dataIndex: ['type', 'name'],
        key: 'type',
        width: '150px',
    },
    {
        title: 'Год выпуска',
        dataIndex: ['yearIssue'],
        key: 'yearIssue',
        width: '150px',
    },
    {
        title: 'Наличие прицепа',
        dataIndex: ['trailer'],
        key: 'trailer',
        render:(value)=>(<Checkbox checked={value}></Checkbox>),
        width: '150px',
    },
];