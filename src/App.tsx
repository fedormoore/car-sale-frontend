import React, {useEffect, useState} from 'react';
import './App.css';
import {Button, Col, Form, Input, Pagination, Row, Space, Table} from "antd";
import {CarModel} from "./models/CarModel";
import {UrlEnum} from "./constants/urlEnum";
import {Request} from "./http/network";
import {carColumns} from "./column/CarColumn";
import CarDrawer from "./components/CarDrawer";
import {TableRowSelection} from "antd/es/table/interface";

let filter = new URLSearchParams();

interface FilterValue {
    param: string;
    value: any;
}

// let selectDataCar = {} as CarModel;

const App = () => {

    const [selectDataCar, setSelectDataCar] = useState<CarModel>({} as CarModel);
    const [selectRecordKey, setSelectRecordKey] = useState<React.Key[]>([]);

    const [carList, setCarList] = useState<CarModel[]>([]);
    const [carTotalElements, setCarTotalElements] = useState<number>(10);
    const [carSelectPage, setCarSelectPage] = useState<number>(0);

    const [filterValue, setFilterValue] = useState<FilterValue[]>([]);

    const [visibleCarDrawer, setVisibleCarDrawer] = useState<boolean>(false);

    useEffect(() => {
        if (carList.length === 0) {
            filter.set('page', '1');
            filter.set('limit', '10');
            loadData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function loadData() {
        Request({
            url: UrlEnum.CarGetAll,
            method: "GET",
            params: filter
        })
            .then((response) => {
                if (response.isOk) {
                    setCarList(response.data.content);
                    setCarTotalElements(response.data.totalElements);
                    setCarSelectPage(response.data.number);

                    setSelectDataCar({} as CarModel);
                    setSelectRecordKey([])
                }
            })
    }

    function onChangePage(current: number, pageSize: number) {
        filter.set('page', current.toString());
        filter.set('limit', pageSize.toString());
        loadData();
    }

    function filterData() {
        for (let i = 0; i < filterValue.length; i++) {
            if (filterValue[i] !== undefined) {
                filter.set(filterValue[i].param, filterValue[i].value)
            }
        }
        loadData();
    }

    const changeFieldFilter = (index: number, name: string, value: any) => {
        let newArr = [...filterValue];
        newArr[index] = {...newArr[index], param: name, value: value};
        setFilterValue(newArr);
    }

    function changeSelectRecord(record: CarModel) {
        setSelectDataCar(record);
        setSelectRecordKey([record.id])
    }

    const rowSelection: TableRowSelection<CarModel> = {
        onSelect: (record) => {
            changeSelectRecord(record);
        },
        selectedRowKeys: selectRecordKey,
    };

    return (
        <div className="App">
            <header className="App-header">
                <div>
                    <Row justify={"start"}>
                        <Space>
                            <Button type="primary" onClick={() => {
                                setVisibleCarDrawer(true)
                                setSelectDataCar({} as CarModel);
                                setSelectRecordKey([])
                            }}>Добавить</Button>
                            <Button type="primary" onClick={() => setVisibleCarDrawer(true)}
                                    disabled={selectDataCar.id === undefined}>Редактировать</Button>
                        </Space>
                    </Row>
                    <br/>
                    <Table rowKey="id"
                           pagination={false}
                           columns={carColumns}
                           dataSource={carList}
                           bordered
                           onRow={(record) => ({
                               onClick: () => {
                                   changeSelectRecord(record)
                               },
                           })}
                           rowSelection={rowSelection}/>
                    <Row justify={"end"}>
                        <Pagination
                            size={"small"}
                            total={carTotalElements}
                            current={carSelectPage + 1}
                            pageSizeOptions={[10, 50, 100]}
                            defaultPageSize={10}
                            showSizeChanger
                            onChange={(current, pageSize) => onChangePage(current, pageSize)}
                        />
                    </Row>
                </div>
                <br/>
                <Form
                    layout="vertical"
                    autoComplete="off"
                >
                    <Row gutter={24} justify="center" align="bottom">
                        <Col span={3}>
                            <Form.Item
                                label='Марка'
                                name='make'
                            >
                                <Input
                                    onChange={value => changeFieldFilter(0, 'make', value.target.value)}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={3}>
                            <Form.Item
                                label='Модель'
                                name='model'
                            >
                                <Input
                                    onChange={value => changeFieldFilter(1, 'model', value.target.value)}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={3}>
                            <Form.Item
                                label='Категория'
                                name='category'
                            >
                                <Input
                                    onChange={value => changeFieldFilter(2, 'category', value.target.value)}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={3}>
                            <Form.Item
                                label='Государственный номер'
                                name='gosNumber'
                            >
                                <Input
                                    onChange={value => changeFieldFilter(3, 'gosNumber', value.target.value)}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={3}>
                            <Form.Item
                                label='Год выпуска'
                                name='yearIssue'
                            >
                                <Input
                                    onChange={value => changeFieldFilter(4, 'yearIssue', value.target.value)}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={3}>
                            <Form.Item>
                                <Button type="primary" onClick={() => filterData()}>Фильтровать</Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </header>
            {visibleCarDrawer &&
                <CarDrawer carOpenDrawer={visibleCarDrawer}
                           carCloseDrawer={() => {
                               setVisibleCarDrawer(!visibleCarDrawer);
                               loadData();
                           }}
                           carValues={selectDataCar}/>
            }
        </div>
    );
}

export default App;
