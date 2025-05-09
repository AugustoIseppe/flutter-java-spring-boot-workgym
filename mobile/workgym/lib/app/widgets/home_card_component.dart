import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

Widget buildHomeCard({
  required String label,
  required IconData icon,
  required BuildContext context,
  required Widget destination,
}) {
  return InkWell(
    onTap: () {
      // Navigator.push(context, MaterialPageRoute(builder: (context) => WeekDay( )));
      Navigator.push(
        context,
        MaterialPageRoute(builder: (context) => destination),
      );
    },
    child: SizedBox(
      width: 160,
      height: 160,
      child: Card(
        color: Colors.white.withAlpha(2),
        child: Padding(
          padding: const EdgeInsets.all(8.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Icon(icon, size: 50, color: Colors.white),
              Center(
                child: Text(
                  label,
                  style: GoogleFonts.merriweather(
                    textStyle: TextStyle(
                      color: Colors.white,
                      letterSpacing: .5,
                      fontSize: 20,
                    ),
                  ),
                  textAlign: TextAlign.center,
                ),
              ),
            ],
          ),
        ),
      ),
    ),
  );
}
