import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import 'package:workgym/app/controllers/login_controller.dart';
import 'package:workgym/app/models/user_exercise_model.dart';
import 'package:workgym/app/pages/training/training_details.dart';

class WeekDayTrainingDetail extends StatefulWidget {
  final String? weekDay;

  const WeekDayTrainingDetail({super.key, required this.weekDay});

  @override
  State<WeekDayTrainingDetail> createState() => _WeekDayTrainingDetailState();
}

class _WeekDayTrainingDetailState extends State<WeekDayTrainingDetail> {
  late Future<List<UserExerciseModel>> _weekDaysTrainingDetailsFuture;

  @override
  void initState() {
    super.initState();
    final user = Provider.of<LoginController>(context, listen: false).user;
    final userId = user?.id;
    if (userId != null) {
      _weekDaysTrainingDetailsFuture = Provider.of<LoginController>(
        context,
        listen: false,
      ).getExercises(userId, widget.weekDay!);
    } else {
      _weekDaysTrainingDetailsFuture = Future.value([]);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Color(0xFF0f2d57),
        elevation: 10,
        shadowColor: Colors.black,
        titleSpacing: 2,
        foregroundColor: Colors.white,
        centerTitle: true,
        title: Text(
          widget.weekDay!,
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
            opacity: 1,
            onError: (exception, stackTrace) {
              // Lidar com o erro de carregamento da imagem aqui, se necessário
              print('Erro ao carregar a imagem: $exception');
            },
          ),
        ),
        child: FutureBuilder(
          future: _weekDaysTrainingDetailsFuture,
          builder: (context, snapshot) {
            if (snapshot.connectionState == ConnectionState.waiting) {
              return const Center(child: CircularProgressIndicator());
            } else if (snapshot.hasError) {
              return const Center(child: Text('Erro ao carregar os treinos'));
            } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
              return const Center(child: Text('Nenhum treino encontrado'));
            } else {
              final exercises = snapshot.data!;
              return ListView.builder(
                itemCount: exercises.length,
                itemBuilder: (context, index) {
                  final exercise = exercises[index];
                  return InkWell(
                    onTap: () {
                        Navigator.push(context, MaterialPageRoute(builder: (context) {
                          return TrainingDetails(
                            userExerciseModel: exercise,
                            weekDay: widget.weekDay,
                          );
                        }));
                    },
                    child: Card(
                      color: Colors.white10,
                      margin: const EdgeInsets.symmetric(
                        horizontal: 16,
                        vertical: 8,
                      ),
                      child: Center(
                        child: ListTile(
                          leading: CircleAvatar(
                            backgroundColor: Colors.white,
                            child: Text(
                              (index + 1).toString(),
                              style: GoogleFonts.merriweather(
                                fontSize: 20,
                                fontWeight: FontWeight.bold,
                                color: Color(0xFF0f2d57),
                              ),
                            ),
                          ),
                          title: Text(
                            exercise.name,
                            style: GoogleFonts.merriweather(
                              fontSize: 16,
                              fontWeight: FontWeight.bold,
                              color: Colors.white,
                            ),
                          ),
                          trailing: Icon(
                            Icons.arrow_forward_ios,
                            color: Colors.white,
                          ),
                        ),
                      ),
                    ),
                  );
                },
              );
            }
          },
        ),
      ),
    );
  }
}
