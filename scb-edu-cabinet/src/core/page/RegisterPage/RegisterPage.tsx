import { Button, Card, Div, FormItem, FormLayout, Input, Title } from "@vkontakte/vkui";
import React, { FC, useEffect } from "react";
import { UserFullInfo, useRegisterMutation } from "../../store/api/auth-api";
import "./RegisterPage.scss";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useNavigate } from "react-router-dom";

const RegisterPage: FC = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [name, setName] = React.useState('');

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [register, registerResult] = useRegisterMutation();
    function onRegisterClick() {
        const body: UserFullInfo = {
            email, password, name
        }
        register(body)
    }
    const navigate = useNavigate()
    useEffect(() => {
        console.log("registerResult", registerResult);
        if (registerResult.isError) {
            alert(((registerResult?.error as FetchBaseQueryError).data as { errors: string[] })["errors"])
        }else if (registerResult.isSuccess){
            navigate("/");
        }
    }, [registerResult])
    return (<div className="register-page-container">
        <Card className="center-message" mode="outline-tint">
            <Div className="login-modal" >
                <Title className="title" level="1" >
                    Регистрация
                </Title>

                <FormLayout>
                    <FormItem top="ФИО" htmlFor="name" className="form"
                    >
                        <Input id="name" type="name" placeholder="Фамилия Имя Отчество" value={name}
                            onChange={(event) => setName(event.currentTarget.value)}

                        />
                    </FormItem>

                    <FormItem className="form"
                        htmlFor="email"
                        top="Логин"
                        bottomId="email-type"
                    >
                        <Input
                            aria-labelledby="email-type"
                            id="email"
                            type="email"
                            placeholder="Введите email"
                            name="email"
                            value={email}
                            onChange={(event) => setEmail(event.currentTarget.value)}
                        />
                    </FormItem>
                    <FormItem top="Пароль" htmlFor="pass" className="form"
                    >
                        <Input id="pass" type="password" placeholder="Введите пароль" value={password}
                            onChange={(event) => setPassword(event.currentTarget.value)}

                        />
                    </FormItem>
                </FormLayout>
                <Button
                    appearance="accent-invariable"
                    size="l"
                    mode="primary"

                    disabled={email.length == 0 || password.length == 0}
                    onClick={() => onRegisterClick()}
                >
                    Зарегистрироваться
                </Button>
            </Div>
        </Card>
    </div>)
}

export default RegisterPage