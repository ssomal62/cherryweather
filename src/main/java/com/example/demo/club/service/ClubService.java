package com.example.demo.club.service;


import com.example.demo.club.dto.ClubDetailDTO;
import com.example.demo.club.dto.ClubListDTO;
import com.example.demo.club.dto.CreateClubDTO;
import com.example.demo.club.dto.UpdateClubDTO;
import com.example.demo.club.entity.Club;
import com.example.demo.club.exception.BadRequestException;
import com.example.demo.club.repository.ClubRepository;
import com.example.demo.club.utils.ClubValidator;
import com.example.demo.common.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.example.demo.common.exception.enums.ExceptionStatus.NOT_FOUND_CLUB;

@Service
@RequiredArgsConstructor
public class ClubService {

    private final ClubRepository clubRepository;

    @Transactional
    public ClubListDTO findAll() {
        return ClubListDTO.fromClubs(clubRepository.findAll());
    }

    @Transactional
    public void saveClub(CreateClubDTO requestDTO) {

        clubRepository.save(
                validateDTO(requestDTO.createClubInfo())
        );
    }

    @Transactional
    public ClubDetailDTO findDetail(long clubId) {
        return ClubDetailDTO.builder()
                .clubDetail(
                        findClubById(clubId)
                ).build();
    }

    @Transactional
    public void updateClub(UpdateClubDTO requestDTO) {
        Club existingClub = findClubById(requestDTO.clubId());

        clubRepository.save(
                validateDTO(requestDTO.updateClub(existingClub))
        );
    }

    @Transactional
    public void deleteClub(long clubId) {
        clubRepository.deleteById(
                findClubById(clubId).getClubId()
        );
    }

    //==============  private method  ==============//

    private Club findClubById (long clubId) {
        return clubRepository.findById(clubId)
                .orElseThrow(() -> new NotFoundException(NOT_FOUND_CLUB));
    }

    private Club validateDTO (Club club) {
        ClubValidator validator = ClubValidator.of(club)
                .validateName()
                .validateCode()
                .validateCategory()
                .validateStatus()
                .validateActivityArea();

        if (!validator.isValid()) {
            List<String> errors = validator.getErrors();
            String errorMessage = String.join(", ", errors);
            throw new BadRequestException("Validation failed: " + errorMessage);
        }
        return club;
    }
}


