package com.kh.daeng.controller.user;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kh.daeng.domain.dto.user.Preference;
import com.kh.daeng.service.iface.PreferenceService;

@RestController
@RequestMapping("/api/preferences")
public class PreferenceController {

    @Autowired
    private PreferenceService preferenceService;

    @GetMapping
    public List<Preference> getAllPreferences() {
        return preferenceService.getAllprePreferences();
    }
}
