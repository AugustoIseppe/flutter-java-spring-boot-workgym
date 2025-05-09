import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';

import 'package:workgym/app/widgets/user_card_helpers.dart';
import 'package:workgym/app/controllers/login_controller.dart';

class UserData extends StatefulWidget {
  const UserData({super.key});

  @override
  State<UserData> createState() => _UserDataState();
}

class _UserDataState extends State<UserData> {
  @override
  Widget build(BuildContext context) {
    final user = context.read<LoginController>().user;

    return Scaffold(
      extendBodyBehindAppBar: true,
      appBar: AppBar(
        backgroundColor: Color(0xFF0f2d57),
        elevation: 10,
        shadowColor: Colors.black,
        titleSpacing: 2,
        foregroundColor: Colors.white,
        centerTitle: true,
        title: Text(
          'Dados do Usuário',
          style: GoogleFonts.merriweather(
            textStyle: TextStyle(
              color: Colors.white,
              letterSpacing: .5,
              fontSize: 20,
              fontWeight: FontWeight.bold,
            ),
          ),
          textAlign: TextAlign.center,
        ),
      ),
      body: Stack(
        children: [
          // Background image
          Container(
            decoration: BoxDecoration(
              image: DecorationImage(
                image: AssetImage('assets/images/bg-home-page.png'),
                fit: BoxFit.cover,
                colorFilter: ColorFilter.mode(
                  Colors.black.withValues(alpha: .5),
                  BlendMode.darken,
                ),
              ),
            ),
          ),
          // User info content
          SafeArea(
            child: Padding(
              padding: const EdgeInsets.all(20.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  const SizedBox(height: 20),
                  buildUserCard('Número de Registro', user!.id),
                  buildUserCard('Nome', user.name),
                  buildUserCard('Email', user.email),
                  buildUserCard('CPF', user.cpf),
                  buildUserCard('Login', user.login),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  
}
