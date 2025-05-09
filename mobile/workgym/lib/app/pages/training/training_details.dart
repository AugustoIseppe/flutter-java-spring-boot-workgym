import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
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
      appBar: AppBar(
       backgroundColor: Color.fromARGB(255, 13, 26, 45),
        elevation: 10,
        shadowColor: Colors.black,
        titleSpacing: 2,
        foregroundColor: Colors.white,
        centerTitle: true,
        title: Text(
          exercise!.name,
          style: GoogleFonts.merriweather(
            textStyle: TextStyle(
              color: Colors.white,
              letterSpacing: .5,
              fontSize: 20,
              fontWeight: FontWeight.bold,
            ),
          ),
          textAlign: TextAlign.center,
        ),
      ),
      body: Container(
        padding: const EdgeInsets.all(20),
        height: double.infinity,
        width: MediaQuery.of(context).size.width,
        decoration: const BoxDecoration(
          image: DecorationImage(
            image: AssetImage('assets/images/bg-home-page.png'),
            fit: BoxFit.cover,
            colorFilter: ColorFilter.mode(
              Color.fromARGB(255, 13, 55, 118),
              // BlendMode.multiply,
              BlendMode.modulate,
            ),
          ),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              margin: const EdgeInsets.only(bottom: 16, top: 16),
              child: Text(
                //texto com underline
                'Exercício:',
                style: GoogleFonts.merriweather(
                  fontSize: 18,
                  fontWeight: FontWeight.w700,
                  color: Colors.white,
                ),
                
                textAlign: TextAlign.start,
              ),
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                const SizedBox(height: 8),
                CircleAvatar(
                  radius: 40,
                  backgroundColor: Colors.black,
                  child: Image.asset(
                    'assets/images/testelogo.png',
                    fit: BoxFit.contain,
                    width: 60,
                    height: 60,
                  ),
                ),
                const SizedBox(width: 16),

                Expanded(
                  child: Text(
                    exercise.name,
                    style: GoogleFonts.merriweather(
                      fontSize: 16,
                      fontWeight: FontWeight.w700,
                      color: Colors.white,
                    ),
                    overflow: TextOverflow.ellipsis,
                  ),
                ),
              ],
            ),
            const Divider(
              color: Colors.white,
              thickness: 1,
              height: 32,
            ),
            Container(
              margin: const EdgeInsets.only(bottom: 16),
              child: Text(
                'Descrição:',
                style: GoogleFonts.merriweather(
                  fontSize: 18,
                  fontWeight: FontWeight.w700,
                  color: Colors.white,
                ),
                textAlign: TextAlign.start,
              ),
            ),
            Text(
              exercise.description,
              style: GoogleFonts.merriweather(
                fontSize: 16,
                fontWeight: FontWeight.w400,
                color: Colors.white,
              ),
              textAlign: TextAlign.start,
            ),
            const SizedBox(height: 16),
            Container(
              margin: const EdgeInsets.only(bottom: 16),
              child: Text(
                'Observação:',
                style: GoogleFonts.merriweather(
                  fontSize: 18,
                  fontWeight: FontWeight.w700,
                  color: Colors.white,
                ),
                textAlign: TextAlign.start,
              ),
            ),
            Text(
              exercise.observation,
              style: GoogleFonts.merriweather(
                fontSize: 16,
                fontWeight: FontWeight.w400,
                color: Colors.white,
              ),
              textAlign: TextAlign.start,
            ),

            const Divider(
              color: Colors.white,
              thickness: 1,
              height: 32,
            ),
            // Repetitions and Series
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                Column(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        Text(
                          exercise.series.toString(),
                          style: GoogleFonts.merriweather(
                            fontSize: 46,
                            fontWeight: FontWeight.w400,
                            color: Colors.white,
                          ),
                          textAlign: TextAlign.start,
                        ),
                        const SizedBox(width: 8),
                        const Text(
                          'x',
                          style: TextStyle(
                            fontSize: 20,
                            fontWeight: FontWeight.w400,
                            color: Colors.white,
                          ),
                        ),
                        const SizedBox(width: 8),

                        Text(
                          exercise.repetitions.toString(),
                          style: GoogleFonts.merriweather(
                            fontSize: 46,
                            fontWeight: FontWeight.w400,
                            color: Colors.white,
                          ),
                          textAlign: TextAlign.start,
                        ),
                      ],
                    ),
                  ],
                ),
              ],
            ),
                Container(
                  margin: const EdgeInsets.only(top: 20),
                  child: Align(
                    alignment: Alignment.bottomCenter,
                    child: Image.asset(
                      'assets/images/testelogo.png',
                      fit: BoxFit.contain,
                      width: 160,
                      height: 160,
                    ),
                  ),
                ),
          ],
        ),
      ),
    );
  }
}
