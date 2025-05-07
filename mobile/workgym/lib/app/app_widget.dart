import 'package:flutter/material.dart';
import 'package:workgym/app/modules/auth/login/login_page.dart';

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
      home: const LoginPage(), // Replace with your actual home page widget
    );
  }
}
