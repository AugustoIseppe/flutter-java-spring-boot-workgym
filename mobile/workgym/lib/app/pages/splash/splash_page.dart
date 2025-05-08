import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:workgym/app/pages/auth/login/login_controller.dart';
import 'package:workgym/app/utils/app_routes.dart';

class SplashPage extends StatefulWidget {
  const SplashPage({super.key});

  @override
  State<SplashPage> createState() => _SplashPageState();
}

class _SplashPageState extends State<SplashPage> {
  @override
  void initState() {
    super.initState();

    // Evita executar notifyListeners durante o build
    WidgetsBinding.instance.addPostFrameCallback((_) {
      _initApp();
    });
  }

  Future<void> _initApp() async {
    final controller = context.read<LoginController>();
    final success = await controller.tryAutoLogin();

    if (success) {
      Navigator.pushReplacementNamed(context, AppRoutes.homePage);
    } else {
      Navigator.pushReplacementNamed(context, AppRoutes.loginPage);
    }
  }

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      body: Center(child: CircularProgressIndicator()),
    );
  }
}
