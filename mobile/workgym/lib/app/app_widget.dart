import 'package:flutter/material.dart';
import 'package:workgym/app/pages/auth/login/login_page.dart';
import 'package:workgym/app/pages/home/screens/home_page.dart';
import 'package:workgym/app/pages/plans/plans_page.dart';
import 'package:workgym/app/pages/schedules/schedules_page.dart';
import 'package:workgym/app/pages/splash/splash_page.dart';
import 'package:workgym/app/pages/training/training_details.dart';
import 'package:workgym/app/pages/userdata/user_data.dart';
import 'package:workgym/app/pages/weekday/week_day.dart';
import 'package:workgym/app/pages/weekday/week_day_training_detail.dart';
import 'package:workgym/app/utils/app_routes.dart';

class AppWidget extends StatefulWidget {
  const AppWidget({super.key});

  @override
  State<AppWidget> createState() => _AppWidgetState();
}

class _AppWidgetState extends State<AppWidget> {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'WorkGym',
      theme: ThemeData(primarySwatch: Colors.blue),
      routes: {
        AppRoutes.splash: (context) => const SplashPage(),
        AppRoutes.loginPage: (context) => const LoginPage(),
        AppRoutes.homePage: (context) => const HomePage(),
        AppRoutes.weekDay: (context) => const WeekDay( ),
        AppRoutes.weekDayTrainingDetail: (context) => WeekDayTrainingDetail( 
          weekDay: null,
        ),
        AppRoutes.trainingDetails: (context) => const TrainingDetails( 
            
            userExerciseModel: null,
            weekDay: null,
        ),
        AppRoutes.userData: (context) => const UserData(),
        AppRoutes.plans: (context) => const PlansPage(),
        AppRoutes.schedules: (context) => const SchedulesPage(),
      },
    );
  }
}
