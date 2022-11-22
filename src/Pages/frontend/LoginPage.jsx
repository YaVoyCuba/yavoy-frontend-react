import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import apiManager from "../../api/apiManager";
import { Loading } from "../../common/Loading";
import { notificationOptions } from "../../mock/notification";
import { login } from "../../redux/authSlice";
import authService from "../../services/authService";

const LoginPage = () => {
  const [page, setPage] = useState("login");

  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [emailToValidate, setEmailToValidate] = useState("");
  const [pin, setPin] = useState("");
  const [mode, setMode] = useState("email");
  const [validatePin, setValidatePin] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const lastPage = localStorage.getItem("lastPage") || "/perfil";

  const { handleSubmit, register,setError } = useForm();

  const submitForm = async (data) => {
    // check if passwords match
    if (data.password !== data.confirmPassword) {
      alert("Password mismatch");
      return;
    }
    // transform email string to lowercase to avoid case sensitivity issues during login
    data.email = data.email.toLowerCase();

    let user= {
      email: data.email,
      password: data.password,
      name: data.firstName
    }

    let json = await apiManager.register(user);
    console.log(json);
    if(json.code == 'ok') {
      
      dispatch(
        login({
          token: json.access_token,
          user: json.user,
        })
      );
      
      navigate(lastPage, { replace: true });
    }else{
      if(json.errors){
        setError('email','ddd');
      }
      toast.success( json.message, notificationOptions);
    }
  };

  const sendCodeToEmail = async () => {
    try {
      setLoading(true);
      let res = await authService.sendCodeToEmail({
        value: email,
        mode: "crecexdiez",
      });

      if (res.code == "ok") {
        toast.success("Código enviado", notificationOptions);
        setValidatePin(true);
        setEmailToValidate(email);
        setEmail("");
        setPin("");
      } else {
        toast.error(res.message, notificationOptions);
      }
    } catch (error) {
      toast.error(error.message, notificationOptions);
    } finally {
      setLoading(false);
    }
  };

  const checkPin = async () => {
    try {
      setLoading(true);
      let res = await authService.checkPin({
        email: emailToValidate,
        pin: pin,
      });

      if (res.code == "ok") {
        toast.success("Código correcto", notificationOptions);
        setValidatePin(false);
        setMode("password");

        dispatch(
          login({
            token: res.access_token,
            user: res.user,
          })
        );
        navigate(lastPage, { replace: true });
      }
    } catch (error) {
      toast.error(error.message, notificationOptions);
    } finally {
      setLoading(false);
    }
  };

  const loginIn = async () => {
    setLoading(true);
    try {
      const res = await authService.login({
        email,
        password,
      });
      if (res) {
        setLoading(false);
        const { access_token, code, message, user } = res;

        if (code === "ok") {
          if (access_token.trim().length > 0) {
            // localStorage.setItem('token', access_token)
            dispatch(
              login({
                token: access_token,
                user: user,
              })
            );

            //Store en local store
            localStorage.setItem("token", access_token);
          }
        } else {
          toast.error(message, notificationOptions);
        }
      } else {
        toast.warning(
          "No se ha podido completar la operación",
          notificationOptions
        );
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.errors, notificationOptions);
    }

    setEmail("");
    setPassword("");
  };

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    loginIn();
  };

  return (
    <div className="flex flex-col text-center mx-auto">
      {loading && <Loading />}

      {page == "login" ? (
        <>
          <div className="flex mt-7 items-center flex-col">
            <span className="font-bold text-center">Acceder</span>
          </div>
          {mode === "email" ? (
            <form
              onSubmit={handleSubmitLogin}
              className="w-full flex flex-col max-w-sm mx-auto gap-3 mt-4"
            >
              <div>
                <input
                  className="input-text w-full "
                  type="email"
                  name="email"
                  value={email}
                  autoComplete="off"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Correo electrónico"
                />
              </div>
              <div>
                <input
                  className="input-text w-full "
                  type="password"
                  name="password"
                  value={password}
                  autoComplete="off"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Contraseña"
                  minLength={8}
                />
              </div>
              <div>
                <Link
                  to={"/forgot-password"}
                  className="text-primary font-medium hover:underline"
                >
                  Olvidé mi contraseña
                </Link>
              </div>
              <button className="btn-main">Continuar</button>
            </form>
          ) : !validatePin ? (
            <div className="w-full flex flex-col gap-3 mt-4 ">
              <input
                name="email"
                onChange={(event) => setEmail(event.target.value)}
                type="text"
                className="input-text"
                placeholder="Email de CrecexDiez"
              />
              <button onClick={() => sendCodeToEmail()} className="btn-main">
                Autentificarse con CrecexDiez
              </button>
            </div>
          ) : (
            <div className="w-full flex flex-col gap-3 mt-4 ">
              <input
                name="pin"
                value={pin}
                onChange={(event) => setPin(event.target.value)}
                type="text"
                className="input-text"
                placeholder="Pin"
              />
              <button onClick={() => checkPin()} className="btn-main">
                Validar Pin
              </button>
            </div>
          )}
          <div className="flex py-10 pt-2 flex-col ">
            <br />
            <span className="text-center">¿No tienes cuenta?</span>
            <button onClick={() => setPage("register")}>
              <span className="text-center text-blue-700 font-medium hover:underline">
                Regístrate
              </span>
            </button>
          </div>
        </>
      ) : (
        <>
        <form className="flex space-y-3 flex-col" onSubmit={handleSubmit(submitForm)}>


        <div className="flex flex-col">
            <span className="font-bold text-center">Regístrate</span>
          </div>
          <div className="flex flex-col">
           
            <input
              type="text"
              placeholder="Nombre"
              className="input-text"
              {...register("firstName")}
              required
            />
          </div>
          <div className="flex flex-col">
            
            <input
              type="email"
              placeholder="Email"
              className="input-text"
              {...register("email")}
              required
            />
          </div>
          <div className="flex flex-col">
             
            <input
              type="password"
              className="input-text"
              placeholder="Contraseña"
              {...register("password")}
              required
            />
          </div>
          <div className="flex flex-col">
          
            <input
              type="password"
              className="input-text"
              placeholder="Confirma la contraseña"
              {...register("confirmPassword")}
              required
            />
          </div>
          <button type="submit" className="btn-main" disabled={loading}>
            Regístrate
          </button>
        </form>
        <div className="flex py-10 pt-2 flex-col ">
            <br />
            <span className="text-center">¿Ya tienes cuenta?</span>
            <button onClick={() => setPage("login")}>
              <span className="text-center text-blue-700 font-medium hover:underline">
                Accede
              </span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default LoginPage;
