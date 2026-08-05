/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
import { App, Button, Drawer, Form, Input, Popconfirm, Table } from "antd";
import { AXIOS } from './../services/index';
import { useEffect, useState } from "react";
import { LuPencil, LuPlus, LuTrash2 } from "react-icons/lu";

const Categorias = () => {

    const { notification } = App.useApp();
    const [categorias, setCategorias] = useState([]);
    const [mostrarCriar, setMostrarCriar] = useState(false);
    const [mostrarEditar, setMostrarEditar] = useState(false);
    const [formEditar] = Form.useForm();

    async function buscar() {
        const res = await AXIOS.get("/categorias", {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`
            }
        });

        if (!Array.isArray(res.data)) {
            notification.error({
                title: "Aviso:",
                description: res.data.mensagem,
                placement: "bottomRight"
            });
            return;
        }

        setCategorias(res.data);
    }

    async function criar(dados) {
        try {
            const res = await AXIOS.post("/categorias", dados, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`
                }
            });

            if (res.status != 201) {
                notification.error({
                    title: "Aviso:",
                    description: res.data.mensagem,
                    placement: "bottomRight"
                });
                return;
            }

            notification.success({
                title: "Aviso:",
                description: res.data.mensagem,
                placement: "bottomRight"
            });
            setMostrarCriar(false);
            buscar();
        } catch (error) {
            notification.error({
                title: "Aviso:",
                description: error.response.data.mensagem,
                placement: "bottomRight"
            });
        }
    }

    async function editar(dados) {
        try {
            const res = await AXIOS.put(`/categorias/${dados.id}`, dados, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`
                }
            });

            if (res.status != 201) {
                notification.error({
                    title: "Aviso:",
                    description: res.data.mensagem,
                    placement: "bottomRight"
                });
                return;
            }

            notification.success({
                title: "Aviso:",
                description: res.data.mensagem,
                placement: "bottomRight"
            });
            setMostrarEditar(false);
            buscar();
        } catch (error) {
            notification.error({
                title: "Aviso:",
                description: error.response.data.mensagem,
                placement: "bottomRight"
            });
        }
    }

    async function deletar(id) {
        try {
            const res = await AXIOS.delete(`/categorias/${id}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`
                }
            });

            notification.success({
                title: "Aviso:",
                description: res.data.mensagem,
                placement: "bottomRight"
            });
            buscar();
        } catch (error) {
            notification.error({
                title: "Aviso:",
                description: error.response.data.mensagem,
                placement: "bottomRight"
            });
        }
    }

    useEffect(() => {
        buscar();
    }, []);

    return (
        <div>
            <div className="flex justify-between items-center mb-5">
                <h1 className="text-2xl text-vinho font-bold">Categorias</h1>
                <Button
                    onClick={() => setMostrarCriar(true)}
                    type="primary"
                    icon={<LuPlus />}
                >
                    Nova categoria
                </Button>
            </div>

            <Table
                dataSource={categorias || []}
                rowKey={"id"}
            >
                <Table.Column
                    title="Nome"
                    dataIndex={"nome"}
                    rowKey="nome"
                />
                <Table.Column
                    title="Ações"
                    className="w-25"
                    render={(_, categoria) => (
                        <div className="flex gap-4 justify-end">
                            <Button
                                icon={<LuPencil />}
                                shape="circle"
                                type="primary"
                                onClick={() => {
                                    formEditar.setFieldValue("id", categoria.id);
                                    formEditar.setFieldValue("nome", categoria.nome);

                                    setMostrarEditar(true)
                                }}
                            />
                            <Popconfirm
                                title="Aviso:"
                                description="Deseja realmente apagar?"
                                cancelText="Não"
                                okText="Sim"
                                onConfirm={() => deletar(categoria.id)}
                            >
                                <Button
                                    icon={<LuTrash2 />}
                                    shape="circle"
                                    type="primary"
                                />
                            </Popconfirm>
                        </div>
                    )}
                />
            </Table>

            <Drawer
                title="Nova categoria"
                open={mostrarCriar}
                onClose={() => setMostrarCriar(false)}
            >
                <Form
                    layout="vertical"
                    onFinish={criar}
                >
                    <Form.Item
                        label="Nome"
                        name="nome"
                        rules={[{ required: true, message: "Campo obrigatório" }]}
                    >
                        <Input placeholder="Digite um nome" />
                    </Form.Item>
                    <Button type="primary" htmlType="submit" className="w-full">Criar</Button>
                </Form>
            </Drawer>

            <Drawer
                title="Editar categoria"
                open={mostrarEditar}
                onClose={() => setMostrarEditar(false)}
            >
                <Form
                    form={formEditar}
                    layout="vertical"
                    onFinish={editar}
                >
                    <Form.Item
                        name="id"
                        hidden
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Nome"
                        name="nome"
                        rules={[{ required: true, message: "Campo obrigatório" }]}
                    >
                        <Input placeholder="Digite um nome" />
                    </Form.Item>
                    <Button type="primary" htmlType="submit" className="w-full">Editar</Button>
                </Form>
            </Drawer>
        </div>
    );
}

export default Categorias;