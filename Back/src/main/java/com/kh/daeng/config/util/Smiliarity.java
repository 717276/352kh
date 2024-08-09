package com.kh.daeng.config.util;

import com.kh.daeng.domain.dto.tour.Tour;
import com.kh.daeng.domain.dto.user.Preference;

public class Smiliarity {
	private static final JaccardSimilarityTransform jaccardSimilarity = new JaccardSimilarityTransform();

	public static double calculate(Tour m1, Tour m2) {
		double preferenceSimilarity = calculateJaccardSimilarity(m1.getPre(), m2.getPre());
		
//		double ratingSimilarity = 1.0 - Math.abs(m1.getRating() - m2.getRating()) / 10.0; 

		double result = 0.7 * preferenceSimilarity;
//		result = 0.3 * ratingSimilarity;
		return result;
	}
	private static double calculateJaccardSimilarity(Preference list1, Preference list2) {			
		return jaccardSimilarity.apply(list1, list2);
	}
}
