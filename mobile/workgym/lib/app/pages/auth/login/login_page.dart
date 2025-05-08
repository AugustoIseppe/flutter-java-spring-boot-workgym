import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
// import 'package:provider/provider.dart';
import 'package:validatorless/validatorless.dart';
import 'package:workgym/app/pages/auth/login/login_controller.dart';
import 'package:workgym/app/widgets/gradient_button.dart';
import 'package:workgym/app/widgets/loader.dart';
import 'package:workgym/app/widgets/todo_list_field.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final _formKey = GlobalKey<FormState>();
  final _emailEC = TextEditingController();
  final _passwordEC = TextEditingController();
  final _emailFocus = FocusNode();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Container(
          padding: EdgeInsets.symmetric(horizontal: 20),
          decoration: BoxDecoration(
            image: DecorationImage(
              image: AssetImage("assets/images/logo-principal.png"),
              fit:
                  BoxFit
                      .cover, // ou .contain, .fill, etc. dependendo do seu layout
            ),
          ),
          child: Consumer<LoginController>(
            builder: (context, controller, child) {
              return Stack(
                children: [
                  Form(
                    key: _formKey,
                    child: Padding(
                      padding: const EdgeInsets.all(18.0),
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        crossAxisAlignment: CrossAxisAlignment.stretch,
                        children: [
                          TodoListField(
                            focusNode: _emailFocus,
                            label: 'Login',
                            controller: _emailEC,
                            // validator: Validatorless.multiple([
                            //   Validatorless.required('E=mail obrigatório'),
                            //   Validatorless.email('Email inválido'),
                            // ]),
                          ),
                          const SizedBox(height: 10),
                          TodoListField(
                            label: 'Senha',
                            obscureText: true,
                            controller: _passwordEC,
                            validator: Validatorless.multiple([
                              Validatorless.required('Senha obrigatória'),
                              Validatorless.min(
                                6,
                                'A senha deve ter no mínimo 6 caracteres',
                              ),
                            ]),
                          ),
                          const SizedBox(height: 10),
                          Consumer<LoginController>(
                            builder: (context, controller, child) {
                              return controller.isLoading
                                  ? const Center(
                                    child: CircularProgressIndicator(),
                                  )
                                  : GradientButton(
                                    text: "Entrar",

                                    onPressed: () async {
                                      final formValid =
                                          _formKey.currentState!.validate();
                                      if (formValid) {
                                        final email = _emailEC.text;
                                        final password = _passwordEC.text;

                                        final token = await context
                                            .read<LoginController>()
                                            .login(email, password);

                                        if (token.isNotEmpty) {
                                          // Aguarda o próximo frame para garantir que o estado foi atualizado
                                          WidgetsBinding.instance
                                              .addPostFrameCallback((_) {
                                                Navigator.of(
                                                  context,
                                                ).pushReplacementNamed(
                                                  '/home-page',
                                                );
                                              });
                                        } else {
                                          final error =
                                              context
                                                  .read<LoginController>()
                                                  .error;
                                          ScaffoldMessenger.of(
                                            context,
                                          ).showSnackBar(
                                            SnackBar(
                                              content: Text(
                                                error ?? 'Erro ao fazer login',
                                              ),
                                            ),
                                          );
                                        }
                                      }
                                    },
                                  );
                            },
                          ),
                        ],
                      ),
                    ),
                  ),
                  Loader(
                    show: controller.isLoading,
                    message: 'Realizando login, por favor aguarde...',
                  ),
                ],
              );
            },
          ),
        ),
      ),
    );
  }
}
