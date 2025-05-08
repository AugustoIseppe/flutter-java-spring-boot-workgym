
import 'package:workgym/app/models/user_exercise_model.dart';

abstract class UserService {
  Future<String> login(String login, String password);
  Future<bool> tryAutoLogin();
  Future<Map<String, dynamic>> getMe(String token); // <--- ADICIONADO AQUI
  Future<List<String>> getWeekDay(String userId); // <--- ADICIONADO AQUI
  Future<List<UserExerciseModel>> getExercises(String userId, String weekDay); // <--- ADICIONADO AQUI
}