import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { debounce } from './debounce';

describe('debounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should debounce function calls', () => {
    const mockFn = vi.fn();
    const debouncedFn = debounce(mockFn, 100);

    debouncedFn('test1');
    debouncedFn('test2');
    debouncedFn('test3');

    expect(mockFn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(100);

    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith('test3');
  });

  it('should call function after wait time', () => {
    const mockFn = vi.fn();
    const debouncedFn = debounce(mockFn, 200);

    debouncedFn('test');

    vi.advanceTimersByTime(199);
    expect(mockFn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1);
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith('test');
  });

  it('should reset timer on subsequent calls', () => {
    const mockFn = vi.fn();
    const debouncedFn = debounce(mockFn, 100);

    debouncedFn('test1');
    vi.advanceTimersByTime(50);

    debouncedFn('test2');
    vi.advanceTimersByTime(50);

    expect(mockFn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(50);
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith('test2');
  });

  it('should handle multiple arguments', () => {
    const mockFn = vi.fn();
    const debouncedFn = debounce(mockFn, 100);

    debouncedFn('arg1', 'arg2', 'arg3');
    vi.advanceTimersByTime(100);

    expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2', 'arg3');
  });

  it('should allow multiple separate debounced calls after wait time', () => {
    const mockFn = vi.fn();
    const debouncedFn = debounce(mockFn, 100);

    debouncedFn('test1');
    vi.advanceTimersByTime(100);

    debouncedFn('test2');
    vi.advanceTimersByTime(100);

    expect(mockFn).toHaveBeenCalledTimes(2);
    expect(mockFn).toHaveBeenNthCalledWith(1, 'test1');
    expect(mockFn).toHaveBeenNthCalledWith(2, 'test2');
  });
});
