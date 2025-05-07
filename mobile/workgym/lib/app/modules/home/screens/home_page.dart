import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:workgym/app/modules/auth/login/login_controller.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  @override
  Widget build(BuildContext context) {
    final user = Provider.of<LoginController>(context).user;
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(18.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: <Widget>[
            Text(
              'Bem-vindo ao WorkGym, ${user?.name}!',
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
              textAlign: TextAlign.center,
            ),
            const Text(
              'Você está na tela inicial.',
              style: TextStyle(fontSize: 18),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 20),
            Text('Email: ${user?.email}', style: TextStyle(fontSize: 18)),
            Text('Login: ${user?.login}', style: TextStyle(fontSize: 18)),
            Text('CPF: ${user?.cpf}', style: TextStyle(fontSize: 18)),
            Text('Role: ${user?.role}', style: TextStyle(fontSize: 18)),
            const SizedBox(height: 20),
            const SizedBox(height: 20),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () async {
          final confirmLogout = await showDialog<bool>(
            context: context,
            builder: (BuildContext context) {
              return AlertDialog(
                title: const Text('Confirmar Logout'),
                content: const Text('Você tem certeza que deseja sair?'),
                actions: [
                  TextButton(
                    onPressed: () => Navigator.of(context).pop(false),
                    child: const Text('Cancelar'),
                  ),
                  TextButton(
                    onPressed: () => Navigator.of(context).pop(true),
                    child: const Text('Sair'),
                  ),
                ],
              );
            },
          );

          if (confirmLogout == true) {
            context.read<LoginController>().logout(context);
            Navigator.pushReplacementNamed(context, '/login-page');
          }
        },
        label: const Text('Logout', style: TextStyle(color: Colors.white)),
        icon: const Icon(Icons.exit_to_app, color: Colors.white),
        backgroundColor: Colors.redAccent,
      ),
    );
  }
}
