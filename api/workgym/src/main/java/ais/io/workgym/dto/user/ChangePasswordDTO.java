package ais.io.workgym.dto.user;

public record ChangePasswordDTO(String login, String oldPassword, String newPassword) {}
