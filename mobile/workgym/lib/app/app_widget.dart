import 'package:flutter/material.dart';
import 'package:workgym/app/modules/auth/login/login_page.dart';
import 'package:workgym/app/modules/home/screens/home-page.dart';
import 'package:workgym/app/modules/splash/splash_page.dart';
import 'package:workgym/app/utils/app_routes.dart';

class AppWidget extends StatefulWidget {
  const AppWidget({super.key});

  @override
  State<AppWidget> createState() => _AppWidgetState();
}

class _AppWidgetState extends State<AppWidget> {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'WorkGym',
      theme: ThemeData(primarySwatch: Colors.blue),
      routes: {
        AppRoutes.splash: (context) => const SplashPage(),
        AppRoutes.loginPage: (context) => const LoginPage(),
        AppRoutes.homePage: (context) => const HomePage(),
      },
    );
  }
}
