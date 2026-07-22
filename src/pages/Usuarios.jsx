/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
import { App, Button, Drawer, Form, Input, Popconfirm, Table } from "antd";
import { AXIOS } from './../services/index';
import { useEffect, useState } from "react";
import { LuPencil, LuPlus, LuTrash2 } from "react-icons/lu";


const Usuarios = () => {

    const { notification } = App.useApp();
    const [usuarios, setUsuarios] = useState([]);
    const [mostrarCriar, setMostrarCriar] = useState(false);
    const [mostrarEditar, setMostrarEditar] = useState(false);
    const [formEditar] = Form.useForm();

    async function buscar() {
        const res = await AXIOS.get("/usuarios", {
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

        setUsuarios(res.data);
    }

    async function criar(dados) {
        try {
            const res = await AXIOS.post("/usuarios", dados, {
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
                title: "Sucesso:",
                description: res.data.mensagem,
                placement: "bottomRight"
            });
            setMostrarCriar(false);
            buscar();
        } catch (error) {
            console.log(error);

            notification.error({
                title: "Aviso:",
                description: error.response.data.mensagem,
                placement: "bottomRight"
            });
        }
    }

    async function editar(dados) {
        try {
            const res = await AXIOS.put(`/usuarios/${dados.id}`, dados, {
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
                title: "Sucesso:",
                description: res.data.mensagem,
                placement: "bottomRight"
            });
            setMostrarEditar(false);
            buscar();
        } catch (error) {
            console.log(error);

            notification.error({
                title: "Aviso:",
                description: error.response.data.mensagem,
                placement: "bottomRight"
            });
        }
    }

    async function deletar(id) {
        try {
            const res = await AXIOS.delete(`/usuarios/${id}`,{
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`
                }
            });

            notification.success({
                title: "Sucesso:",
                description: res.data.mensagem,
                placement: "bottomRight"
            });
            buscar();
        } catch (error) {
            console.log(error);

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
                <h1 className="text-2xl text-vinho font-bold">Usuários</h1>
                <Button onClick={() => setMostrarCriar(true)} type="primary" icon={<LuPlus />}>Novo usuário</Button>
            </div>

            <Table
                dataSource={usuarios || []}
                rowKey={"id"}
            >
                <Table.Column
                    title="Nome"
                    dataIndex={"nome"}
                    rowKey="nome"
                />
                <Table.Column
                    title="Email"
                    dataIndex={"email"}
                    rowKey="email"
                />
                <Table.Column
                    title="Ações"
                    className="w-25"
                    render={(_, usuario) => (
                        <div className="flex gap-4 justify-end">
                            <Button
                                icon={<LuPencil />}
                                shape="circle"
                                type="primary"
                                onClick={() => {
                                    formEditar.setFieldValue("id", usuario.id);
                                    formEditar.setFieldValue("nome", usuario.nome);
                                    formEditar.setFieldValue("email", usuario.email);
                                    setMostrarEditar(true);
                                }}
                            />
                            <Popconfirm
                                title="Aviso:"
                                description="Deseja realmente apagar?"
                                cancelText="Não"
                                okText="Sim"
                                onConfirm={() => deletar(usuario.id)}
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
                title="Novo usuário"
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
                        rules={[{ required: true, message: "campo obrigatorio" }]}
                    >
                        <Input placeholder="Digite o nome do usuário" />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: "campo obrigatorio" }]}
                    >
                        <Input placeholder="Digite o email do usuário" />
                    </Form.Item>
                    <Form.Item
                        label="Senha"
                        name="senha"
                        rules={[{ required: true, message: "campo obrigatorio" }]}
                    >
                        <Input placeholder="Digite a senha do usuário" />
                    </Form.Item>
                    <Button type="primary" htmlType="submit" className="w-full">
                        Criar
                    </Button>
                </Form>
            </Drawer>

            <Drawer
                title="Editar usuário"
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
                        rules={[{ required: true, message: "campo obrigatorio" }]}
                    >
                        <Input placeholder="Digite o nome do usuário" />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: "campo obrigatorio" }]}
                    >
                        <Input placeholder="Digite o email do usuário" />
                    </Form.Item>
                    <Form.Item
                        label="Senha"
                        name="senha"
                    >
                        <Input placeholder="Digite a senha do usuário" />
                    </Form.Item>
                    <Button type="primary" htmlType="submit" className="w-full">
                        Salvar
                    </Button>
                </Form>
            </Drawer>

        </div>
    );
}

export default Usuarios;