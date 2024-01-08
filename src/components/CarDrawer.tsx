import React, {FC, useEffect, useState} from 'react';

import {Button, Checkbox, Col, Drawer, Empty, Form, Input, Row, Select, Space} from "antd";
import {CarModel} from "../models/CarModel";
import {Request} from "../http/network";
import {UrlEnum} from "../constants/urlEnum";
import {CategoryModel} from "../models/CategoryModel";
import {TypeModel} from "../models/TypeModel";

interface CarDrawerProps {
    carOpenDrawer: boolean;
    carCloseDrawer: () => void;
    carValues: CarModel;
}

const CarDrawer: FC<CarDrawerProps> = (props) => {

    const [form] = Form.useForm();

    const [values, setValues] = useState<CarModel>(props.carValues);

    const [sprCategory, setSprCategory] = useState<CategoryModel[]>([]);
    const [sprType, setSprType] = useState<TypeModel[]>([]);

    useEffect(() => {
        if (sprCategory.length === 0) {
            Request({
                url: UrlEnum.CategoryGetAll,
                method: "GET"
            })
                .then((response) => {
                    if (response.isOk) {
                        setSprCategory(response.data);
                    }
                })
        }
        if (sprType.length === 0) {
            Request({
                url: UrlEnum.TypeGetAll,
                method: "GET"
            })
                .then((response) => {
                    if (response.isOk) {
                        setSprType(response.data);
                    }
                })
        }
        form.setFieldsValue(
            {
                "make": props.carValues.make,
                'model': props.carValues.model,
                "category": props.carValues.category?.name,
                "gosNumber": props.carValues.gosNumber,
                "type": props.carValues.type?.name,
                "yearIssue": props.carValues.yearIssue,
            }
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onClickSaveRecord = () => {
        console.log(values)
        form.validateFields()
            .then(() => {
                (async function () {
                    Request({
                        url: values.id !== undefined ? UrlEnum.CarEdit : UrlEnum.CarNew,
                        method: values.id !== undefined ? "PUT" : "POST",
                        body: JSON.stringify(values),
                    })
                        .then((response) => {
                            if (response.isOk) {
                                props.carCloseDrawer();
                            }
                        })
                })();
            })
            .catch((errorInfo) => {

            });
    }

    const changeField = (name: string, value: any) => {
        setValues({...values, [name]: value});
    }

    return (
        <Drawer
            title={values.id !== undefined ? 'Редактировать запись' : 'Добавить запись'}
            width={'500px'}
            closable={false}
            open={props.carOpenDrawer}
            extra={
                <Space>
                    <Button onClick={props.carCloseDrawer}>Закрыть</Button>
                    <Button type="primary" onClick={() => onClickSaveRecord()}>
                        Сохранить
                    </Button>
                </Space>
            }
        >
            <Form form={form} layout="vertical">
                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item
                            label="Марка"
                            name="make"
                            rules={[
                                {
                                    required: true,
                                    message: 'Пожалуйста укажите марку'
                                }
                            ]}
                        >
                            <Input
                                value={values.make}
                                onChange={e => changeField("make", e.target.value)}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Модель"
                            name='model'
                            rules={[
                                {
                                    required: true,
                                    message: 'Пожалуйста укажите модель'
                                }
                            ]}
                        >
                            <Input
                                onChange={e => changeField("model", e.target.value)}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item
                            label="Категория"
                            name='category'
                            rules={[
                                {
                                    required: true,
                                    message: 'Пожалуйста укажите категорию'
                                }
                            ]}
                        >
                            <Select
                                style={{maxWidth: '100%', minWidth: '100%'}}
                                allowClear
                                showSearch
                                filterOption={(input, option) =>
                                    (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
                                }
                                notFoundContent={
                                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}
                                           description="Нет данных"/>
                                }
                                onChange={(value, objectValues: any) => changeField("category", objectValues?.object)}
                            >
                                {sprCategory.map((item: CategoryModel) => {
                                    return (
                                        <Select.Option value={item.id} key={item.id} object={item}>
                                            {item.name}
                                        </Select.Option>
                                    );
                                })}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Тип ТС"
                            name='type'
                            rules={[
                                {
                                    required: true,
                                    message: 'Пожалуйста укажите тип ТС'
                                }
                            ]}
                        >
                            <Select
                                style={{maxWidth: '100%', minWidth: '100%'}}
                                allowClear
                                showSearch
                                filterOption={(input, option) =>
                                    (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
                                }
                                notFoundContent={
                                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}
                                           description="Нет данных"/>
                                }
                                onChange={(value, objectValues: any) => changeField("type", objectValues?.object)}
                            >
                                {sprType.map((item: TypeModel) => {
                                    return (
                                        <Select.Option value={item.id} key={item.id} object={item}>
                                            {item.name}
                                        </Select.Option>
                                    );
                                })}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item
                            label="Государственный номер"
                            name='gosNumber'
                            rules={[
                                {
                                    required: true,
                                    message: 'Пожалуйста укажите государственный номер'
                                }
                            ]}
                        >
                            <Input
                                onChange={e => changeField("gosNumber", e.target.value)}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Год выпуска"
                            name='yearIssue'
                            rules={[
                                {
                                    required: true,
                                    message: 'Пожалуйста укажите год выпуска'
                                }
                            ]}
                        >
                            <Input
                                onChange={e => changeField("yearIssue", e.target.value)}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item
                            label="Наличие прицепа"
                            valuePropName="trailer"
                        >
                            <Checkbox
                                checked={values.trailer}
                                onChange={e => changeField("trailer", e.target.checked)}
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Drawer>
    );
};

export default CarDrawer;