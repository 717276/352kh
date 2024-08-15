package com.kh.daeng.config.util;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import com.kh.daeng.domain.dto.tour.Tour;
import com.kh.daeng.domain.dto.user.Preference;
@Component
public class Smiliarity {
	private static final JaccardSimilarityTransform jaccardSimilarity = new JaccardSimilarityTransform();

	public static List<Tour> calculate(Preference m1, List<Tour> m2) {		
		List<Tour> allowedTours = new ArrayList<>();
		for (Tour t : m2) {
			if(t.getT_status() == 1) {
				allowedTours.add(t);
			}
		}
		return calculateJaccardSimilarity(m1, allowedTours);
	}
	private static List<Tour> calculateJaccardSimilarity(Preference list1, List<Tour> list2) {			
		return jaccardSimilarity.apply(list1, list2);
	}
}
