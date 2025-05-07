import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

import 'package:workgym/app/constants/constants.dart';
import 'package:workgym/app/data/store.dart';
import 'package:workgym/app/dto/login_response_dto.dart';
import 'package:workgym/app/repositories/user_repository.dart';

class UserRepositoryImpl implements UserRepository {

  final Constants constants = Constants();
  String? token;
  @override
  Future<LoginResponseDto?> login(String login, String password) async{
    try {
      final response = await http.post(
        Uri.parse(constants.loginUrl),
        body: jsonEncode({
          "login": login,
          "password": password
    }),
        headers: {
          'Content-Type': 'application/json',
        },
      );
      if (response.statusCode == 200) {
        final Map<String, dynamic> jsonResponse = jsonDecode(response.body);
        token = jsonResponse['token'];
        // ignore: avoid_print
        print("Token: $token");
        return LoginResponseDto.fromJson(jsonResponse);
      } else {
        throw Exception('Failed to load data');
      }
    } catch (error) {
      // ignore: avoid_print
      print('Error: $error');
      rethrow;
    }
  }
  
  @override
  Future<Map<String, dynamic>?> tryAutoLogin(String token) async {
    final userData = await Store.getMap("userData");
    debugPrint("RETORNO API SHARED PREFERENCESSSS!!! -> $userData");
    return userData;
  }
  
}