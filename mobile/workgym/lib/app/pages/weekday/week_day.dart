import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import 'package:workgym/app/controllers/login_controller.dart';
import 'package:workgym/app/pages/weekday/week_day_training_detail.dart';

class WeekDay extends StatefulWidget {
  const WeekDay({super.key});

  @override
  State<WeekDay> createState() => _WeekDayState();
}

class _WeekDayState extends State<WeekDay> {
  late Future<List<String>> _weekDaysFuture;

  @override
  void initState() {
    super.initState();
    final user = Provider.of<LoginController>(context, listen: false).user;
    final userId = user?.id;
    if (userId != null) {
      _weekDaysFuture = Provider.of<LoginController>(
        context,
        listen: false,
      ).getWeekDay(userId);
    } else {
      _weekDaysFuture = Future.value([]);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Color.fromARGB(255, 13, 26, 45),
        elevation: 10,
        shadowColor: Colors.black,
        titleSpacing: 2,
        foregroundColor: Colors.white,
        centerTitle: true,
        title: Text(
          'Treinos da Semana',
          style: GoogleFonts.merriweather(
            textStyle: TextStyle(
              color: Colors.white,
              letterSpacing: .5,
              fontSize: 25,
              fontWeight: FontWeight.bold,
            ),
          ),
          textAlign: TextAlign.center,
        ),
      ),
      body: Container(
        decoration: BoxDecoration(
          image: DecorationImage(
            image: AssetImage('assets/images/bg-home-page.png'),
            fit: BoxFit.fill,
            colorFilter: ColorFilter.mode(
              Color.fromARGB(255, 13, 55, 118),
              // BlendMode.multiply,
              BlendMode.modulate,
            ),
          ),
        ),
        child: Column(
          children: [
            const SizedBox(height: 20),
            Center(
              child: FutureBuilder<List<String>>(
                future: _weekDaysFuture,
                builder: (context, snapshot) {
                  // Logs para debug
                  print("Snapshot data: ${snapshot.data}");
                  print("Snapshot hasData: ${snapshot.hasData}");
                  print("Snapshot error: ${snapshot.error}");

                  if (snapshot.connectionState == ConnectionState.waiting) {
                    return const Center(child: CircularProgressIndicator());
                  }

                  if (snapshot.hasError) {
                    return Center(child: Text('Erro: ${snapshot.error}'));
                  }

                  if (!snapshot.hasData || snapshot.data!.isEmpty) {
                    return const Center(
                      child: Text('Nenhum dia de treino encontrado.'),
                    );
                  }

                  // Remove a ordenação manual, pois os dados já vêm ordenados
                  final weekDays = snapshot.data!;

                  return SizedBox(
                    height: 550,
                    child: ListView.builder(
                      itemCount: weekDays.length,
                      itemBuilder: (context, index) {
                        final day = weekDays[index];
                        return InkWell(
                          onTap: () {
                            // Navegar para a página de detalhes do treino do dia
                            Navigator.push(
                              context,
                              MaterialPageRoute(
                                builder: (context) {
                                  return WeekDayTrainingDetail(weekDay: day);
                                },
                              ),
                            );
                          },
                          child: Card(
                            color: Colors.white10,
                            margin: const EdgeInsets.symmetric(
                              horizontal: 16,
                              vertical: 8,
                            ),
                            child: ListTile(
                              title: Text(
                                day,
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
                          ),
                        );
                      },
                    ),
                  );
                },
              ),
            ),
            Image.asset(
              'assets/images/testelogo.png',
              fit: BoxFit.fitWidth,
              width: 200,
              height: 150,
            ),
          ],
        ),
      ),
    );
  }
}
