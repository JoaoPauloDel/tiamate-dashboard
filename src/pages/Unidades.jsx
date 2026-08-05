/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
import { App, Button, Drawer, Form, Input, Popconfirm, Table } from "antd";
import { AXIOS } from './../services/index';
import { useEffect, useState } from "react";
import { LuPencil, LuPlus, LuTrash2 } from "react-icons/lu";

const Unidades = () => {

    const { notification } = App.useApp();
    const [unidades, setUnidades] = useState([]);
    const [mostrarCriar, setMostrarCriar] = useState(false);
    const [mostrarEditar, setMostrarEditar] = useState(false);
    const [formEditar] = Form.useForm();

    async function buscar() {
        const res = await AXIOS.get("/unidades", {
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

        setUnidades(res.data);
    }

    async function criar(dados) {
        try {
            const res = await AXIOS.post("/unidades", dados, {
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
            const res = await AXIOS.put(`/unidades/${dados.id}`, dados, {
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
            const res = await AXIOS.delete(`/unidades/${id}`, {
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
                <h1 className="text-2xl text-vinho font-bold">Unidades</h1>
                <Button
                    onClick={() => setMostrarCriar(true)}
                    type="primary"
                    icon={<LuPlus />}
                >
                    Nova unidade
                </Button>
            </div>

            <Table
                dataSource={unidades || []}
                rowKey={"id"}
            >
                <Table.Column
                    title="Nome"
                    dataIndex={"nome"}
                    rowKey="nome"
                />
                <Table.Column
                    title="Endereço"
                    dataIndex={"endereco"}
                    rowKey="endereco"
                />
                <Table.Column
                    title="Horário"
                    dataIndex={"horario"}
                    rowKey="horario"
                />
                <Table.Column
                    title="Telefone"
                    dataIndex={"telefone"}
                    rowKey="telefone"
                />
                <Table.Column
                    title="Ações"
                    className="w-25"
                    render={(_, unidade) => (
                        <div className="flex gap-4 justify-end">
                            <Button
                                icon={<LuPencil />}
                                shape="circle"
                                type="primary"
                                onClick={() => {
                                    formEditar.setFieldValue("id", unidade.id);
                                    formEditar.setFieldValue("nome", unidade.nome);
                                    formEditar.setFieldValue("endereco", unidade.endereco);
                                    formEditar.setFieldValue("horario", unidade.horario);
                                    formEditar.setFieldValue("telefone", unidade.telefone);
                                    setMostrarEditar(true)
                                }}
                            />
                            <Popconfirm
                                title="Aviso:"
                                description="Deseja realmente apagar?"
                                cancelText="Não"
                                okText="Sim"
                                onConfirm={() => deletar(unidade.id)}
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
                title="Nova unidade"
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
                    <Form.Item
                        label="Endereço"
                        name="endereco"
                        rules={[{ required: true, message: "Campo obrigatório" }]}
                    >
                        <Input placeholder="Digite um endereco" />
                    </Form.Item>
                    <Form.Item
                        label="Horário"
                        name="horario"
                        rules={[{ required: true, message: "Campo obrigatório" }]}
                    >
                        <Input placeholder="Digite um horario" />
                    </Form.Item>
                    <Form.Item
                        label="Telefone"
                        name="telefone"
                        rules={[{ required: true, message: "Campo obrigatório" }]}
                    >
                        <Input placeholder="Digite um telefone" />
                    </Form.Item>
                    <Button type="primary" htmlType="submit" className="w-full">Criar</Button>
                </Form>
            </Drawer>

            <Drawer
                title="Editar unidade"
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
                    <Form.Item
                        label="Endereço"
                        name="endereco"
                        rules={[{ required: true, message: "Campo obrigatório" }]}
                    >
                        <Input placeholder="Digite um endereco" />
                    </Form.Item>
                    <Form.Item
                        label="Horário"
                        name="horario"
                        rules={[{ required: true, message: "Campo obrigatório" }]}
                    >
                        <Input placeholder="Digite um horario" />
                    </Form.Item>
                    <Form.Item
                        label="Telefone"
                        name="telefone"
                        rules={[{ required: true, message: "Campo obrigatório" }]}
                    >
                        <Input placeholder="Digite um telefone" />
                    </Form.Item>
                    <Button type="primary" htmlType="submit" className="w-full">Editar</Button>
                </Form>
            </Drawer>
        </div>
    );
}

export default Unidades;