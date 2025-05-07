import 'package:flutter/material.dart';

class Loader extends StatelessWidget {
  final bool show;
  final String? message;

  const Loader({super.key, required this.show, this.message});

  @override
  Widget build(BuildContext context) {
    return AnimatedSwitcher(
      duration: const Duration(milliseconds: 300),
      child: show
          ? Container(
              color: Colors.black.withValues(alpha: .5),
              alignment: Alignment.center,
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const CircularProgressIndicator(
                    color: Colors.white,
                  ),
                  if (message != null) ...[
                    const SizedBox(height: 20),
                    Text(
                      message!,
                      style: const TextStyle(
                        color: Colors.white,
                        fontSize: 16,
                      ),
                      textAlign: TextAlign.center,
                    ),
                  ],
                ],
              ),
            )
          : const SizedBox.shrink(),
    );
  }
}
