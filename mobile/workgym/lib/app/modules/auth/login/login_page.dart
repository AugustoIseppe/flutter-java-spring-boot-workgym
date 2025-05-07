import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
// import 'package:provider/provider.dart';
import 'package:validatorless/validatorless.dart';
import 'package:workgym/app/modules/auth/login/login_controller.dart';
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
        child: Form(
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
                TextButton(
                  style: ButtonStyle(
                    backgroundColor: WidgetStateProperty.all(
                      Colors.blueAccent.shade700,
                    ),
                  ),
                  onPressed: () {
                    final formValid = _formKey.currentState!.validate();
                    if (formValid) {
                      final email = _emailEC.text;
                      final password = _passwordEC.text;
                      context.read<LoginController>().login(email, password);
                    }
                  },
                  child: Text(
                    'Login',
                    style: TextStyle(
                      color: Colors.white,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
