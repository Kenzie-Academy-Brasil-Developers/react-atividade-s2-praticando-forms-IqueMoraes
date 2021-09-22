import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "./styles.css";

export default function Form() {
  const formSchema = yup.object().shape({
    user: yup.string().required("Nome de usuário obrigatório"),
    fullname: yup.string().required("Nome completo obrigatório"),
    email: yup.string().email("E-mail inválido").required("E-mail obrigatório"),
    emailconfirm: yup
      .string()
      .oneOf([yup.ref("email")], "E-mail não correspondente")
      .required("E-mail obrigatório"),
    password: yup
      .string()
      .matches(
        /^((?=.*[0-9]){1})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*[a-z]){1}((?=.*[A-Z]){1}).*$/,
        "Senha inválida (deve conter ao menos um caracter especial, um maiúsculo, um minúsculo e um número"
      )
      .required("Senha obrigatória"),
    passwordconfirm: yup
      .string()
      .oneOf([yup.ref("password")], "Senha não correspondente")
      .required("Senha obrigatória"),
    terms: yup.boolean().oneOf([true], "É preciso concordar com os termos."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(formSchema) });

  const imprimeNoConsole = (data) => {
    console.log(data);
  };
  console.log(errors);

  return (
    <div className="formBox">
      <h3>Formulário de inscrição</h3>
      <form onSubmit={handleSubmit(imprimeNoConsole)}>
        <input
          placeholder="Escolha um nome para Usuário"
          {...register("user")}
        />
        {<p className="errorMsg">{errors.user && errors.user.message}</p>}
        <input
          placeholder="Digite seu nome completo"
          {...register("fullname")}
        />
        {
          <p className="errorMsg">
            {errors.fullname && errors.fullname.message}
          </p>
        }

        <input
          placeholder="Escolha um endereço de E-mail"
          {...register("email")}
        />
        {<p className="errorMsg">{errors.email && errors.email.message}</p>}

        <input
          placeholder="Confirme seu E-mail"
          {...register("emailconfirm")}
        />
        {
          <p className="errorMsg">
            {errors.emailconfirm && errors.emailconfirm.message}
          </p>
        }
        <div className="passwordBox">
          <div className="alertPasswordBox">
            <input
              type="password"
              placeholder="Crie sua senha difícil"
              {...register("password")}
            />
            {
              <p className="errorMsg">
                {errors.password && errors.password.message}
              </p>
            }
          </div>
          <div className="alertPasswordBox">
            <input
              type="password"
              placeholder="Confirme sua senha"
              {...register("passwordconfirm")}
            />
            {
              <p className="errorMsg">
                {errors.passwordconfirm && errors.passwordconfirm.message}
              </p>
            }
          </div>
        </div>
        <div className="termsBox">
          <input type="checkbox" {...register("terms")} />
          <p>Eu aceito os termos de uso da aplicação </p>
          {<p className="errorMsg">{errors.terms && errors.terms.message}</p>}
        </div>

        <button type="submit">REALIZAR CADASTRO</button>
        <p className="link">Já possui um cadastro?</p>
      </form>
    </div>
  );
}
