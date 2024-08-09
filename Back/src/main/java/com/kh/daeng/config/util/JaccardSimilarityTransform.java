package com.kh.daeng.config.util;

import com.kh.daeng.domain.dto.user.Preference;

public class JaccardSimilarityTransform {		
	public Double apply(final Preference left, Preference right) {
		if (left == null || right == null) {
			throw new IllegalArgumentException("Input cannot be null");
		}
		return calculateJaccardSimilarity(left, right);
	}

	private Double calculateJaccardSimilarity(final Preference left, final Preference right) {		
		final int[] leftArray = changeToInt(left);
		final int[] rightArray = changeToInt(right);		
		final int leftSize = counting(leftArray);
		final int rightSize = counting(rightArray);
		
		if (leftSize == 0 || rightSize == 0) {
			return 0d;
		}
					
		int[] union = new int[10];
		int unionSize = 0;
		for (int i = 0; i < 5; ++i) {
			if(leftArray[i] == 1) {
				if (rightArray[i] == 0) {
					union[i] = 1;
					unionSize++;
				}
			}
			if (rightArray[i] == 1) {
				union[i] = 1;
				unionSize++;
			}
		}		
		final int intersectionSize = leftSize + rightSize - unionSize;
		return 1.0d * intersectionSize / unionSize;
	}

	private int[] changeToInt(Preference element) {
		int[] temp = new int[5];
		if (element.getPf_cafe() == 1) {
			temp[0] = 1;
		}
		if (element.getPf_rest() == 1) {
			temp[1] = 1;
		}
		if (element.getPf_sport() == 1) {
			temp[2] = 1;
		}
		if (element.getPf_spot() == 1) {
			temp[3] = 1;		
		}
		if (element.getPf_walk() == 1) {
			temp[4] = 1;		
		}
		return temp;
	}	
	private int counting(int[] element) {
		int size = 0;
		for (int i =0; i < 5; ++i) {
			if (element[i] == 1) {
				size++;
			}
		}
		return size;
	}
}
