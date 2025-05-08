import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:workgym/app/controllers/login_controller.dart';
import 'package:workgym/app/models/user_exercise_model.dart';

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
      appBar: AppBar(title: const Text('')),
      body: FutureBuilder(
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
                return Card(
                  margin: const EdgeInsets.all(8.0),
                  child: ListTile(
                    title: Text(exercise.name),
                    subtitle: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text('Séries: ${exercise.series}'),
                        Text('Repetições: ${exercise.repetitions}'),
                        Text('Observação: ${exercise.observation}'),
                      ],
                    ),
                  ),
                );
              },
            );
          }
        },
      ),
    );
  }
}
