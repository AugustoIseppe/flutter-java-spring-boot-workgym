import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:workgym/app/app_widget.dart';
import 'package:workgym/app/modules/auth/login/login_controller.dart';
import 'package:workgym/app/repositories/user_repository.dart';
import 'package:workgym/app/repositories/user_repository_impl.dart';
import 'package:workgym/app/services/user_service.dart';
import 'package:workgym/app/services/user_service_impl.dart';

class AppModule extends StatelessWidget {
  const AppModule({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        Provider<UserRepository>(
          create: (_) => UserRepositoryImpl(),
        ),
        Provider<UserService>(
          create: (context) => UserServiceImpl(
            userRepository: context.read<UserRepository>(),
          ),
        ),
        ChangeNotifierProvider<LoginController>(
          create: (context) => LoginController(
            userService: context.read<UserService>(),
          ),
        ),
      ],
      child: const AppWidget(),
    );
  }
}
