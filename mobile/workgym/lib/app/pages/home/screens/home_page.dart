import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import 'package:workgym/app/controllers/login_controller.dart';

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
      body: SafeArea(
        child: Container(
          padding: const EdgeInsets.all(20),
          height: double.infinity,
          width: double.infinity,
          decoration: const BoxDecoration(
            image: DecorationImage(
              image: AssetImage('assets/images/bg-home-page.png'),
              fit: BoxFit.cover,
            ),
          ),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              const SizedBox(height: 20),
              SizedBox(
                //container para o logo e o texto de boas-vindas
                child: Column(
                  children: [
                    Text(
                      'Bem-vindo,',
                      style: GoogleFonts.merriweather(
                        textStyle: TextStyle(
                          color: Colors.white,
                          letterSpacing: .5,
                          fontSize: 40,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                    Text(
                      '${user?.login}!',
                      style: GoogleFonts.merriweather(
                        textStyle: TextStyle(
                          color: Colors.white,
                          letterSpacing: .5,
                          fontSize: 30,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 40),
              //container com 2 cards
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(20),
                decoration: BoxDecoration(
                  color: Colors.white.withValues(alpha: 0.1),
                  borderRadius: BorderRadius.circular(20),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black.withAlpha(50),
                      blurRadius: 10,
                      offset: const Offset(0, 5),
                    ),
                  ],
                ),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceAround,
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        InkWell(
                          onTap: () {
                            // Navigator.pushNamed(context, '/meus-treinos-page');
                            print('Navegando para a página Meus Treinos');
                          },
                          child: SizedBox(
                            width: 160,
                            height: 160,
                            child: Card(
                              color: Colors.white.withAlpha(2),
                              child: Padding(
                                padding: const EdgeInsets.all(8.0),
                                child: Column(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  crossAxisAlignment: CrossAxisAlignment.center,
                                  children: [
                                    const Icon(
                                      Icons.fitness_center,
                                      size: 50,
                                      color: Colors.white,
                                    ),
                                    Center(
                                      child: Text(
                                        'Meus Treinos',
                                        style: GoogleFonts.merriweather(
                                          textStyle: TextStyle(
                                            color: Colors.white,
                                            letterSpacing: .5,
                                            fontSize: 20,
                                          ),
                                        ),
                                        textAlign: TextAlign.center,
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            ),
                          ),
                        ),
                        SizedBox(
                          width: 160,
                          height: 160,
                          child: Card(
                            color: Colors.white.withAlpha(2),
                            // width: 150,
                            child: Padding(
                              padding: const EdgeInsets.all(8.0),
                              child: Column(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                                  const Icon(
                                    Icons.person,
                                    size: 50,
                                    color: Colors.white,
                                  ),
                                  Center(
                                    child: Text(
                                      'Meus Dados',
                                      style: GoogleFonts.merriweather(
                                        textStyle: TextStyle(
                                          color: Colors.white,
                                          letterSpacing: .5,
                                          fontSize: 20,
                                        ),
                                      ),
                                      textAlign: TextAlign.center,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceAround,
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        SizedBox(
                          width: 160,
                          height: 160,
                          child: Card(
                            color: Colors.white.withAlpha(2),
                            // width: 150,
                            child: Padding(
                              padding: const EdgeInsets.all(8.0),
                              child: Column(
                                mainAxisAlignment: MainAxisAlignment.center,
                                crossAxisAlignment: CrossAxisAlignment.center,
                                children: [
                                  const Icon(
                                    Icons.punch_clock,
                                    size: 50,
                                    color: Colors.white,
                                  ),
                                  Center(
                                    child: Text(
                                      'Horários',
                                      style: GoogleFonts.merriweather(
                                        textStyle: TextStyle(
                                          color: Colors.white,
                                          letterSpacing: .5,
                                          fontSize: 20,
                                        ),
                                      ),
                                      textAlign: TextAlign.center,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ),
                        ),
                        SizedBox(
                          width: 160,
                          height: 160,
                          child: Card(
                            color: Colors.white.withAlpha(2),
                            // width: 150,
                            child: Padding(
                              padding: const EdgeInsets.all(8.0),
                              child: Column(
                                mainAxisAlignment: MainAxisAlignment.center,
                                crossAxisAlignment: CrossAxisAlignment.center,
                                children: [
                                  const Icon(
                                    Icons.business,
                                    size: 50,
                                    color: Colors.white,
                                  ),
                                  Center(
                                    child: Text(
                                      'Nossos Serviços',
                                      style: GoogleFonts.merriweather(
                                        textStyle: TextStyle(
                                          color: Colors.white,
                                          letterSpacing: .5,
                                          fontSize: 20,
                                        ),
                                      ),
                                      textAlign: TextAlign.center,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 40),
              //container com imagem de fundo
              Container(
                width: double.infinity,
                height: 200,
                decoration: BoxDecoration(
                  image: const DecorationImage(
                    image: AssetImage('assets/images/logo-sem-bg.png'),
                    fit: BoxFit.cover,
                  ),
                  borderRadius: BorderRadius.circular(20),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black.withAlpha(50),
                      blurRadius: 10,
                      offset: const Offset(0, 5),
                    ),
                  ],
                ),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
      // floatingActionButton: FloatingActionButton.extended(
      //   onPressed: () async {
      //     final confirmLogout = await showDialog<bool>(
      //       context: context,
      //       builder: (BuildContext context) {
      //         return AlertDialog(
      //           title: const Text('Confirmar Logout'),
      //           content: const Text('Você tem certeza que deseja sair?'),
      //           actions: [
      //             TextButton(
      //               onPressed: () => Navigator.of(context).pop(false),
      //               child: const Text('Cancelar'),
      //             ),
      //             TextButton(
      //               onPressed: () => Navigator.of(context).pop(true),
      //               child: const Text('Sair'),
      //             ),
      //           ],
      //         );
      //       },
      //     );

      //     if (confirmLogout == true) {
      //       context.read<LoginController>().logout(context);
      //       Navigator.pushReplacementNamed(context, '/login-page');
      //     }
      //   },
      //   label: Text(
      //     'Logout',
      //     style: GoogleFonts.merriweather(
      //       textStyle: TextStyle(
      //         color: Colors.black,
      //         letterSpacing: .5,
      //         fontSize: 20,
      //       ),
      //     ),
      //   ),
      //   icon: const Icon(Icons.exit_to_app, color: Colors.black),
      //   backgroundColor: Colors.white,
      // ),
    );
  }
}
