import 'package:flutter/material.dart';
import 'package:workgym/app/models/user_exercise_model.dart';

class TrainingDetails extends StatefulWidget {
  final UserExerciseModel? userExerciseModel;
  final String? weekDay;

  const TrainingDetails({
    super.key,
    required this.userExerciseModel,
    required this.weekDay,
  });

  @override
  State<TrainingDetails> createState() => _TrainingDetailsState();
}

class _TrainingDetailsState extends State<TrainingDetails> {
  @override
  Widget build(BuildContext context) {
    final exercise = widget.userExerciseModel;
    return Scaffold(
      appBar: AppBar(title: Text(widget.userExerciseModel!.name)),
      body: Container(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Exercício: ${exercise!.name}',
              style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 8.0),
            Text('Description: ${exercise.description}'),
            const SizedBox(height: 8.0),
            Text('Series: $exercise!.series}'),
            const SizedBox(height: 8.0),
            Text('Repetitions: ${exercise.repetitions}'),
            const SizedBox(height: 8.0),
            Text('Observation: ${exercise.observation}'),
          ],
        ),
      ),
    );
  }
}
