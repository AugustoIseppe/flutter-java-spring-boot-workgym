import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:workgym/app/screens/app_widget.dart';

class AppModule extends StatelessWidget {

  const AppModule({ super.key });

   @override
   Widget build(BuildContext context) {
       return MultiProvider(
         providers: [
          Provider(create: (_) => Object()),
         ],
         child: MaterialApp(
           title: 'WorkGym',
           theme: ThemeData(
             primarySwatch: Colors.blue,
           ),
           home: const AppWidget(), // Replace with your actual home page widget
         ),
       );
  }
}