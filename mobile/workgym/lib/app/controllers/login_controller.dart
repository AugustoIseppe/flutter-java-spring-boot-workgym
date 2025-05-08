import 'package:flutter/material.dart';
import 'package:workgym/app/models/user_exercise_model.dart';
import 'package:workgym/app/services/user_service.dart';
import 'package:workgym/app/models/user_model.dart';
import 'dart:convert';
import 'package:workgym/app/utils/store.dart';

class LoginController extends ChangeNotifier {
  final UserService _userService;

  bool _isLoading = false;
  String? _error;
  bool _isSuccess = false;
  UserModel? _user; // Adiciona a propriedade que armazena o usuário.

  bool get isLoading => _isLoading;
  String? get error => _error;
  bool get success => _isSuccess;
  UserModel? get user => _user; // Getter para o usuário

  LoginController({required UserService userService})
    : _userService = userService;

  Future<String> login(String login, String password) async {
    _isLoading = true;
    _error = null;
    _isSuccess = false;
    notifyListeners();

    try {
      // 1. Realiza o login para obter o token
      final token = await _userService.login(login, password);
      _isSuccess = token.isNotEmpty;

      // 2. Se o login for bem-sucedido (token obtido)
      if (_isSuccess) {
        // 3. Busca os dados do usuário usando o token obtido.
        //    Assumindo que _userService tem um método getMe(token) que retorna Map<String, dynamic>.
        //    Se o seu UserService não tiver esse método, você precisará adicioná-lo,
        //    fazendo com que ele chame o método getMe do seu UserRepository.
        final Map<String, dynamic> userDataMap = await _userService.getMe(
          token,
        );

        // 4. Converte o mapa de dados do usuário para o UserModel
        _user = UserModel.fromMap(userDataMap);

        // 5. Salva os dados do usuário no SharedPreferences
        await Store.saveString('user', jsonEncode(_user!.toMap()));
        print("Dados do usuário salvos após login: ${_user!.toMap()}");
      }

      return token; // Retorna o token como no código original
    } catch (e) {
      _error = 'Erro ao fazer login: $e';
      _user = null; // Garante que o usuário seja nulo em caso de erro
      return "";
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<bool> tryAutoLogin() async {
    _isLoading = true;
    notifyListeners();

    try {
      final result = await _userService.tryAutoLogin();
      if (result) {
        final userString = await Store.getString('user');
        if (userString.isNotEmpty) {
          _user = UserModel.fromMap(jsonDecode(userString));
        }
      }
      return result;
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<void> logout(BuildContext context) async {
    await Store.remove('token');
    await Store.remove('user');

    _user = null;
    _isSuccess = false;
    notifyListeners();

    Navigator.of(context).pushNamedAndRemoveUntil('/login', (route) => false);
  }

  Future<List<String>> getWeekDay(String userId) async {
    try {
      final weekDays = await _userService.getWeekDay(userId);
      print("Dias da semana (Controller): $weekDays"); // Log para debug
      return weekDays;
    } catch (e) {
      print('Erro no controller: $e');
      return [];
    }
  }

  Future<List<UserExerciseModel>> getExercises(String userId, String weekDay) async {
    try {
      final exercises = await _userService.getExercises(userId, weekDay);
      print("Exercícios (Controller): $exercises"); // Log para debug
      return exercises;
    } catch (e) {
      print('Erro no controller: $e');
      return [];
    }
  }
}
